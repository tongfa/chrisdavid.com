<script>
    import { onMount } from 'svelte';
    import { Carta, Markdown } from 'carta-md';
    export let media = '';

    const carta = new Carta({
        sanitizer: false,
    });

    let value = '';
    let loading = true;

    onMount(async () => {
        if (media) {
            const response = await fetch(media);
            if (response.ok) {
                value = await response.text();
                loading = false;
            } else {
                console.error('Failed to load media:', response.statusText);
                value = `Failed to load media: ${response.statusText}`;
                loading = false;
            }
        }
    });
</script>

{#if loading}
    <p>Loading...</p>
{:else}
    <Markdown {carta} {value} />
{/if}
