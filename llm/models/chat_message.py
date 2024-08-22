from llama_cloud import MessageRole
from pydantic import BaseModel

class ChatMessage(BaseModel):
    content: str
    role: MessageRole
        
class ChatMessages(BaseModel):
    histories: list[ChatMessage]