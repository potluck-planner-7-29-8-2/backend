# backend

Backend for Potluck Planner

Heroku logs:
npx heroku logs --tail -a potluck-planner-bw

Heroku DB reset:
npx heroku restart -a potluck-planner-bw && npx heroku pg:reset DATABASE --confirm potluck-planner-bw -a potluck-planner-bw && npx heroku run knex migrate:latest -a potluck-planner-bw
