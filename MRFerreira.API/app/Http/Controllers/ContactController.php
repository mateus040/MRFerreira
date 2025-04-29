<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\SendEmailRequest;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(SendEmailRequest $request)
    {
        $validated = $request->validated();

        Mail::to('mrferreirarepresentacao@hotmail.com')->send(new ContactMail(
            $validated['nome'],
            $validated['email'],
            $validated['descricao']
        ));

        return response()->json(['message' => 'E-mail enviado com sucesso!'], 200);
    }
}
