interface MetadataItem {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  lang?: string;
  icon?: string;
  keyword?: string;
}

export const useOcHead = (handler: () => Promise<MetadataItem>) => {
  const { data, error } = useAsyncData('metadata', handler, {
    transform: (data) => {
      return {
        title: data?.title ?? 'Default Title',
        description: data?.description ?? 'Default Description',
        image: data?.image ?? '/default-image.jpg',
        url: data?.url ?? '',
        type: data?.type ?? 'Website',
        lang: data?.lang ?? 'en',
        icon: data?.icon ?? '/favicon.ico',
        keyword: data?.keyword ?? '',
      }
    }
  });

  useHead(() => ({
    title: data.value?.title,
    meta: [
      // Open Graph
      { property: 'og:title', content: data.value?.title },
      { property: 'og:description', content: data.value?.description },
      { property: 'og:image', content: data.value?.image },
      { property: 'og:url', content: data.value?.url },
      { property: 'og:type', content: data.value?.type },

      // Other
      { property: 'lang', content: data.value?.lang },
      { property: 'icon', content: data.value?.icon },
      { name: 'description', content: data.value?.description },
      { name: 'keyword', content: data.value?.keyword },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: data.value?.title },
      { name: 'twitter:description', content: data.value?.description },
      { name: 'twitter:image', content: data.value?.image },
    ],
  }));

  return { data, error };
};