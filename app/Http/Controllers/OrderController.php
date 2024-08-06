<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function orderList(Request $request)
    {
        $query = Order::where("store_id", Auth::user("store")->id)
            ->with(['orderItems', 'user']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        } else {
            $query->where('status', "Sipariş sürüyor");
        }

        if ($request->filled('date')) {
            switch ($request->date) {
                case 'yeni':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'eski':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'para':
                    $query->orderBy('total_amount', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        }

        $orders = $query->paginate(12);

        return Inertia::render('Store/OrderList', [
            'orders' => $orders,
        ]);
    }


    public function orderDetail($order_code)
    {
        $order = Order::where("store_id", Auth::user()->id)
            ->where("order_code", $order_code)
            ->with(['orderItems.product.images', 'orderItems.product.attributes', 'user'])
            ->firstOrFail();

        return Inertia::render('Store/OrderDetail', ['order' => $order]);
    }

    public function updateOrderDetail(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $orderItem = OrderItem::findOrFail($id);
        $orderItem->status = $request->status;
        $orderItem->save();

        return redirect()->back()->with([
            'message' => "Sipariş durumu başarıyla güncellendi",
            'type' => 'success',
        ]);
    }

    public function allUpdateOrderDetail(Request $request, $order_code)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $order = Order::where("order_code", $order_code)->with("orderItems")->firstOrFail();

        foreach ($order->orderItems as $item) {
            $orderItem = OrderItem::findOrFail($item->id);
            $orderItem->status = $request->status;
            $orderItem->save();
        }

        return redirect()->back()->with([
            'message' => "Toplu sipariş durumu başarıyla güncellendi",
            'type' => 'success',
        ]);
    }

    public function generatePdf($id)
    {
        $order = Order::with('orderItems.product', 'user', 'store')->findOrFail($id);
        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.order_receipt', compact('order'));

        return $pdf->download('order_receipt.pdf');
    }
}
