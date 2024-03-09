<?php

namespace Src\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\Config\DatabaseConnector;
use Src\Models\Authentication;
use Src\Utils\Checker;
use Src\Utils\Response;
use Exception;

class TokenService
{
    private $authenticationModel;
    private $pdo;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->authenticationModel = new Authentication($this->pdo);
    }
    function login($user)
    {
        if (!(Checker::isFieldExist($user, ["email", "password"]))) {
            return Response::payload(
                400,
                false,
                "email and password is required"
            );
        }

        $email = filter_var($user['email'], FILTER_SANITIZE_EMAIL);
        $password = $user['password'];

        $user = $this->authenticationModel->get("email", $email);
        $token = $this->create($user, $password);

        if (!$token) {
            return Response::payload(
                401,
                false,
                "Incorrect email or password"
            );
        }

        unset($user['password']);
        return Response::payload(
            200,
            true,
            "Login successful",
            array("user" => $user, "token" => $token)
        );
    }
    function create($user, $password)
    {

        if (!($user && password_verify($password, $user['password']))) {
            return false;
        }

        $payload = array(
            "user_id" => $user["user_id"],
        );

        $token = JWT::encode(
            $payload,
            $_ENV['SECRET_API_KEY'],
            "HS256"
        );
        setcookie("token", $token, [
            'expires' => time() + 3600,
            'path' => '/',
            'domain' => '',
            'secure' => true,
            'httponly' => true
        ]);

        return $token;
    }

    function delete()
    {
        if (isset($_COOKIE['token'])) {
            setcookie("token", "", time() - 3600);
            return Response::payload(200, true, "Logout successful");
        } else {
            return Response::payload(401, false, "Logout unsuccessful");
        }
    }
    function readEncodedToken()
    {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $token = str_replace('Bearer ', '',  $headers['Authorization']);

            $key = $_ENV['SECRET_API_KEY'];

            try {
                $token = JWT::decode($token, new Key($key, 'HS256'));
                $token = json_decode(json_encode(($token)), true);
                return $token;
            } catch (Exception $e) {
                error_log($e->getMessage());
            }
        } else {
            return null;
        }
    }
    function isTokenMatch($id)
    {
        $tokenService = new TokenService();
        $token = $tokenService->readEncodedToken();

        return $token && $token['user_id'] == $id;
    }
}
