import strawberry
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class Category:
    name: str

@strawberry.type
class Task:
    id: str
    title: str
    is_completed: bool
    category: Category

db = [Task(id="1", title="титл", is_completed=False, category=Category(name="имя категории"))]

@strawberry.type
class Query:
    @strawberry.field
    def all_tasks(self) -> list[Task]: 
        return db

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_task(self, title: str) -> Task:
        t = Task(id=str(len(db) + 1), title=title, is_completed=False, category=Category(name="имя категории"))
        db.append(t)
        return t

    @strawberry.mutation
    def complete_task(self, id: str) -> Task | None:
        for t in db:
            if t.id == id:
                t.is_completed = True
                return t

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(GraphQLRouter(strawberry.Schema(query=Query, mutation=Mutation)), prefix="/graphql")