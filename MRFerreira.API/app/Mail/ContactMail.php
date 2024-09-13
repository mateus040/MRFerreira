<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nome;
    public $email;
    public $descricao;

    /**
     * Create a new message instance.
     */
    public function __construct($nome, $email, $descricao)
    {
        $this->nome = $nome;
        $this->email = $email;
        $this->descricao = $descricao;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Contato de ' . $this->nome,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    public function build()
    {
        return $this->from('suporte.mrferreira@gmail.com') // O endereço que enviará o e-mail
            ->replyTo($this->email) // O endereço para o qual as respostas devem ser enviadas
            ->subject('Novo contato de ' . $this->nome)
            ->view('emails.contact')
            ->with([
                'nome' => $this->nome,
                'email' => $this->email,
                'descricao' => $this->descricao,
            ]);
    }
}
