FROM python:3.10

WORKDIR /notebooks

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies for data science and ML
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    jupyter \
    matplotlib \
    pandas \
    scikit-learn \
    tensorflow \
    torch \
    transformers \
    openai

# Expose Jupyter port
EXPOSE 8888

# Start Jupyter notebook
CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root", "--NotebookApp.token=''", "--NotebookApp.password=''"] 