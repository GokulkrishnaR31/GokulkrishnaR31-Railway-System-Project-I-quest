from flask import Flask, jsonify, request
import os
import google.generativeai as genai
import logging
from flask_cors import CORS



# Suppress GRPC-related warnings to avoid clutter in output
logging.getLogger("grpc").setLevel(logging.ERROR)
app = Flask(__name__)
CORS(app)
# Set up the generation configuration for the chatbot
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction="""The Railway Ticket Booking Chatbot should handle user authentication, 
    train search, ticket booking, cancellation, and PNR status checks. 
    It must support natural language queries for real-time train availability, 
    fare calculation, and live tracking. Integration with payment gateways, 
    OTP verification, and a secure database is essential for seamless transactions.""",
)

chat_session = model.start_chat(
    history=[
        {"role": "user", "parts": ["pyt.\n"]},
        {"role": "model", "parts": ["Welcome to the Railway Ticket Booking Chatbot! How can I assist you today?"]},
    ]
)

def get_chatbot_response(user_input):
    response = chat_session.send_message(user_input)  # Send user message to the chatbot
    return response.text  # Return the chatbot's response

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    if user_message:
        chatbot_response = get_chatbot_response(user_message)
        return jsonify({"response": chatbot_response})
    return jsonify({"response": "Sorry, I did not understand that."})

if __name__ == '__main__':
    app.run(debug=True)
