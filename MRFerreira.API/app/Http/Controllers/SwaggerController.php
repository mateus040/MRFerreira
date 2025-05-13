<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     version="0.0.1",
 *     title="MRFerreira - Documentação",
 *     description="Documentação de todas as rotas da MRFerreira",
 * )
 *
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="Servidor da API"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Please provide a valid JWT token."
 * )
 */
class SwaggerController extends Controller {}
