import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

device = 'cuda' if torch.cuda.is_available() else 'cpu'

# Define the model name
model_name = 'meta-llama/Llama-3.2-1B'

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, device_map='auto', torch_dtype=torch.float16)

# Load the already trained model
trained_model = PeftModel.from_pretrained(model, './model_llama_fine_2024_10_17', is_trainable=False)


def generate_amazon_review(product_name, max_length=200):
    """Generates an Amazon review for the given product name and sentiment.

    Args:
      product_name: The name of the product.
      max_length: The token length of the review.

    Returns:
      The generated review text.
    """

    # generate the prompt
    prompt = f"Write a detailed Amazon review for '{product_name}'. My meaning about this product is positive"

    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    # Generate text using the used_model
    output = trained_model.generate(
        inputs["input_ids"],
        attention_mask=inputs["attention_mask"],
        max_length=max_length,
        do_sample=True,
        temperature=0.5,
        top_p=0.9,
        num_return_sequences=1,
        early_stopping=True,
        repetition_penalty=1.5,
        pad_token_id=tokenizer.eos_token_id,
        eos_token_id=tokenizer.eos_token_id
    )

    # Decode the generated text
    review = tokenizer.decode(output[0], skip_special_tokens=True).replace(prompt, '')
    if review.startswith(". ") or review.startswith(", "):
        return review[2:]  # Remove the first two characters when it's a punctuation

    return review
