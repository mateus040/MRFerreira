<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ResponseException extends Exception
{
    public function status(): int
    {
        if (app()->isProduction()) {
            return HttpResponse::HTTP_BAD_REQUEST;
        }

        $statusCode = array_keys(HttpResponse::$statusTexts);

        return in_array($this->code, $statusCode)
            ? $this->code
            : HttpResponse::HTTP_INTERNAL_SERVER_ERROR;
    }

    public function message(): string
    {
        if (app()->isProduction()) {
            return __('exceptions.default');
        }

        return empty($this->message)
            ? __('exceptions.default')
            : $this->message;
    }

    public function render(): JsonResponse
    {
        return response()->json(['message' => $this->message()], $this->status());
    }
}
