<?php

namespace App\Http\Controllers;

use App\Models\Order;
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

    public function generatePdf($id)
    {
        $order = Order::with('orderItems.product', 'user', 'store')->findOrFail($id);
        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.order_receipt', compact('order'));

        return $pdf->download('order_receipt.pdf');
    }
}
