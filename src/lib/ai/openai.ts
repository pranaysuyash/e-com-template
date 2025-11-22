import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function improveProductDescription(description: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert e-commerce copywriter. Improve product descriptions to be more engaging, SEO-friendly, and conversion-focused while maintaining the original information.',
        },
        {
          role: 'user',
          content: `Improve this product description:\n\n${description}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return response.choices[0]?.message?.content || description
  } catch (error) {
    console.error('Error improving description:', error)
    throw new Error('Failed to improve description')
  }
}

export async function generateProductDescription(productData: {
  title: string
  category?: string
  attributes?: Record<string, string>
}): Promise<string> {
  try {
    const attributesText = productData.attributes
      ? Object.entries(productData.attributes)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      : ''

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert e-commerce copywriter. Generate compelling product descriptions that highlight features, benefits, and create desire.',
        },
        {
          role: 'user',
          content: `Generate a product description for:\nTitle: ${productData.title}\nCategory: ${productData.category || 'N/A'}\nAttributes: ${attributesText}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 300,
    })

    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error generating description:', error)
    throw new Error('Failed to generate description')
  }
}

export async function generateProductImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Product photography: ${prompt}. Professional, high-quality, commercial style, clean background.`,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    })

    return response.data[0]?.url || ''
  } catch (error) {
    console.error('Error generating image:', error)
    throw new Error('Failed to generate image')
  }
}

export async function generateImageVariants(
  originalPrompt: string,
  count: number = 3
): Promise<string[]> {
  try {
    const variants: string[] = []

    for (let i = 0; i < count; i++) {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `${originalPrompt}. Variation ${i + 1}. Professional product photography.`,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      })

      if (response.data[0]?.url) {
        variants.push(response.data[0].url)
      }
    }

    return variants
  } catch (error) {
    console.error('Error generating variants:', error)
    throw new Error('Failed to generate image variants')
  }
}

export async function generateSEOContent(productData: {
  title: string
  description: string
}): Promise<{
  metaTitle: string
  metaDescription: string
  metaKeywords: string
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an SEO expert. Generate optimized meta title, description, and keywords for e-commerce products.',
        },
        {
          role: 'user',
          content: `Generate SEO metadata for:\nTitle: ${productData.title}\nDescription: ${productData.description}\n\nProvide the result in JSON format: {"metaTitle": "...", "metaDescription": "...", "metaKeywords": "..."}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    const content = response.choices[0]?.message?.content
    if (content) {
      return JSON.parse(content)
    }

    throw new Error('No content generated')
  } catch (error) {
    console.error('Error generating SEO content:', error)
    throw new Error('Failed to generate SEO content')
  }
}
