import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import os

def verify():
    model_name = "microsoft/phi-2"
    adapter_paths = {
        "ecommerce": "models/adapters/ecommerce",
        "education": "models/adapters/education",
        "telecom": "models/adapters/telecom"
    }

    print(f"Checking for base model: {model_name}")
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
        print("✅ Tokenizer loaded.")
    except Exception as e:
        print(f"❌ Failed to load tokenizer: {e}")
        return

    for domain, path in adapter_paths.items():
        full_path = os.path.join(os.getcwd(), path)
        print(f"\nVerifying {domain} adapter at {full_path}...")
        if os.path.exists(full_path):
            print(f"✅ Adapter directory found.")
            # We don't load the full model here as it requires significant GPU/RAM
            # Just checking for config files
            config_path = os.path.join(full_path, "adapter_config.json")
            if os.path.exists(config_path):
                print(f"✅ adapter_config.json found.")
            else:
                print(f"❌ adapter_config.json NOT found.")
        else:
            print(f"❌ Adapter directory NOT found.")

if __name__ == "__main__":
    verify()
