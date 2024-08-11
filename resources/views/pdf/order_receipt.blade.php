<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sipariş Faturası</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12px;
        }

        .container {
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px;
            color: #333;
        }

        .order-info,
        .shipping-info {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid gray;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .order-info h2,
        .shipping-info h2 {
            font-size: 18px;
            margin-bottom: 10px;
            color: #555;
        }

        .order-details {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border-radius: 8px;
            overflow: hidden;
        }

        .order-details th,
        .order-details td {
            border: 1px solid #ddd;
            padding: 12px;
        }

        .order-details th {
            background-color: #f2f2f2;
            text-align: left;
            color: #333;
        }

        .order-details td {
            color: #666;
            text-align: left;
        }

        .barcode {
            text-align: center;
            margin-top: 20px;
        }

        .barcode img {
            width: 50%;
        }

        .steps {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
        }

        .steps img {
            width: 100%;
            height: auto;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Sipariş Faturası</h1>
        </div>

        <div class="order-info">
            <h2>Sipariş Bilgileri</h2>
            <p>Sipariş No: {{ $order->order_code }}</p>
            <p>Tarih: {{ $order->created_at->format('d.m.Y') }}</p>
        </div>

        <div class="shipping-info">
            <h2>Alıcı Bilgileri</h2>
            <p>Ad Soyad: {{ $order->user->name }}</p>
            <p>Adres: {{ $order->delivery_address }}</p>
            <p>Telefon: {{ $order->user->phone }}</p>
        </div>

        <table class="order-details">
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Miktar</th>
                    <th>Toplam</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->orderItems as $item)
                    <tr>
                        <td>{{ $item->product->name }}</td>
                        <td style="width: 10%">{{ $item->quantity }}</td>
                        <td style="width: 15%">
                            <p>{{ number_format($item->quantity * $item->price, 2) }} TL</p>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
