<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'descricao' => 'required|string',
        ]);

        // TODO: trocar para o e-mail do marquinho
        Mail::to('mateusgabrielmoreno264@gmail.com')->send(new ContactMail(
            $validated['nome'],
            $validated['email'],
            $validated['descricao']
        ));

        return response()->json(['message' => 'E-mail enviado com sucesso!'], 200);
    }
}
