from transformers import pipeline

text_to_summarize="""Abstract: There has been a lot of recent interest in designing neural network models to
estimate a distribution from a set of examples. We introduce a simple
modification for autoencoder neural networks that yields powerful generative
models. Our method masks the autoencoder's parameters to respect autoregressive
constraints: each input is reconstructed only from previous inputs in a given
ordering. Constrained this way, the autoencoder outputs can be interpreted as a
set of conditional probabilities, and their product, the full joint
probability. We can also train a single network that can decompose the joint
probability in multiple different orderings. Our simple framework can be
applied to multiple architectures, including deep ones. Vectorized
implementations, such as on GPUs, are simple and fast. Experiments demonstrate
that this approach is competitive with state-of-the-art tractable distribution
estimators. At test time, the method is significantly faster and scales better
than other autoregressive estimators."""

summarizer = pipeline('summarization')
summary = summarizer(text_to_summarize)
print(summary)
