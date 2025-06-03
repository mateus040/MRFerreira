<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\SendEmailRequest;
use App\Mail\ContactMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ContactController extends Controller
{
    public function sendEmail(SendEmailRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $recipientEmail = env('MAIL_RECIPIENT');

        Mail::to($recipientEmail)->send(new ContactMail(
            $validated['nome'],
            $validated['email'],
            $validated['descricao']
        ));

        return response()->json(['message' => 'E-mail enviado com sucesso!'], HttpResponse::HTTP_OK);
    }
}
