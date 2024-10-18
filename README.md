# Ironhack Project: RoboReviews

This project includes different models and approaches to analyse the sentiment of reviews, categorizing reviews and to create own reviews

## Files and Folders

**Files**
* `app.py`: The flask server handler
* `controller.py`: Generate response payloads for requets to flask server
* `model.py`: Used to generate reviews for flask page

* `sentiment_categorizing.ipynb`: Jupyter Notebook containing the code to analyse the sentiment of the reviews and to group those into product categories.
* `reviews_gbt2.ipynb`: Jupyter Notebook containing the code for data preprocessing, model training, and evaluation of a **GPT2** Model.
* `reviews_llama.ipynb`: Jupyter Notebook containing the code for data preprocessing, model training, and evaluation of a **LLama** Model and review generator. (Best)
* `top_3.ipynb`: Jupyter Notebook containing the code to generate a list of the best and the worst 3 products

* `presentation.pdf`: The presentation slides

**Folders**
* `lists/*.csv`: Lists ov reviews after different stages of processing
* `templates/*`: Template files for flask server
* `static/*`: Assets used for website

## Instructions

1. Clone the repository.
2. Open Notebooks in Google Colab or Jupyter Notebook.
3. Run the notebook cells to execute the code.

## Results

The results of the different models and preprocessing techniques are summarized in the notebook.

## Libraries

The following libraries are used in this project:

* datasets
* evaluate
* flask
* gensim
* matplotlib
* pandas
* peft
* nltk
* re
* sklearn
* torch
* transformers
* wordcloud

Make sure to install these libraries before running the code.

## Contact

For any questions or feedback, please contact me.