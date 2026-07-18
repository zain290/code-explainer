import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Codex'
const SITE_URL = 'https://codex.zemz.pro'
const DEFAULT_DESC = 'AI-powered code explanation tool. Paste any code and get a detailed step-by-step explanation with line-by-line breakdown and optimization analysis. Built with high-end AI language models.'
const DEFAULT_IMAGE = 'https://codex.zemz.pro/og-image.png'

interface SEOHeadProps {
  title: string
  description?: string
  path?: string
  image?: string
  type?: string
  noindex?: boolean
  schemaMarkup?: string
}

export function SEOHead({ title, description = DEFAULT_DESC, path = '', image = DEFAULT_IMAGE, type = 'website', noindex = false, schemaMarkup }: SEOHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`
  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemaMarkup && (
        <script type="application/ld+json">{schemaMarkup}</script>
      )}
    </Helmet>
  )
}
