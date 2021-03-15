#curl -H "Content-Type: application/json"\
#  -d '{"email": "test@test.ru", "password": "my_very_secret_password"}'\
#  --insecur -X POST  https://127.0.0.1:3000/api/account/sign-up

curl -H "Content-Type: application/json"\
  -d '{"email": "test@test.com", "password": "my_very_secret_password"}'\
  --insecur -X POST  https://127.0.0.1:3000/api/account/sign-in


