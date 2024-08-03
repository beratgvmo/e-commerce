<!DOCTYPE html>
<html>

<head>
    <title>Order Receipt</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
    </style>
</head>

<body>
    <h1>Order #{{ $order->order_code }}</h1>
    <p>User: {{ $order->user->name }}</p>
    <p>Store: {{ $order->store->name }}</p>
    <p>Total Amount: {{ $order->total_amount }}</p>
    <p>Shipping Cost: {{ $order->shipping_cost }}</p>
    <p>Status: {{ $order->status }}</p>

    <h2>Items</h2>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($order->orderItems as $item)
                <tr>
                    <td>{{ $item->product->name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ $item->price }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
