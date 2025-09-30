import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const linksSchemaBase = z.object({
  priority: z.boolean().default(false),

  category: z.string(),
  platform: z.literal(undefined),

  href: z.string(),

  title: z.string(),
  description: z.string().optional(),
});

const linksSchemaPlatformSite = z.object({
  platform: z.literal("website"),
})

const linksSchemaPlatformCustom = z.object({
  platform: z.literal("custom"),
  icon: z.string(),
});

const linksSchema = z.discriminatedUnion("platform", [
  linksSchemaPlatformCustom,
  linksSchemaPlatformSite,
  linksSchemaBase,
])

export default defineContentConfig({
  collections: {
    links: defineCollection({
      type: 'data',
      source: 'links/**/*.md',
      schema: linksSchema,
    })
  }
})
