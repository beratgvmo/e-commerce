<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StoreDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Store/Dashboard');
    }
}
