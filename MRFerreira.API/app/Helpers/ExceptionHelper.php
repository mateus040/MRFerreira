<?php

namespace App\Helpers;

use GuzzleHttp\Exception\RequestException;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ExceptionHelper
{
    public static function getExceptionMessage(mixed $exception): string
    {
        $message = '';

        if (get_class($exception) === RequestException::class) {
            if (
                method_exists($exception, 'getResponse')
                && method_exists($exception->getResponse(), 'getBody')
            ) {
                $message = strval($exception->getResponse()->getBody());
            }
        }

        if (method_exists($exception, 'getMessage') && empty($message)) {
            $message = $exception->getMessage();
        }

        return $message;
    }

    public static function getExceptionStatusCode(mixed $exception): int
    {
        $statusCode = 0;

        $validStatus = array_keys(HttpResponse::$statusTexts);

        if (method_exists($exception, 'getCode')) {
            $statusCode = $exception->getCode();
        }

        if (in_array($statusCode, $validStatus)) {
            return $statusCode;
        }

        return HttpResponse::HTTP_INTERNAL_SERVER_ERROR;
    }
}
