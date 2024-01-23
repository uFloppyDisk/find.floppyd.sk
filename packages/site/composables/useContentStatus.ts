import type ContentStatus from '~/types/ContentStatus';

export default function () {
  const config = useRuntimeConfig();

  const twitch: Ref<ContentStatus["twitch"]> = ref({
    live: false,
    started_at: '',
  }); 

  (() => {
    const { pending, data } = useFetch<ContentStatus["twitch"]>
    (config.public.CFWorkerTwitchGetStatus, { 
      lazy: true,
      server: false,
    });

    watch(pending, () => {
      twitch.value = data.value ?? { live: false, started_at: ''};
    })
  })();

  return { twitch };
}
