<script lang="ts">
    import OpenPlayerJS from 'openplayerjs'; // Import the library
    import { onMount } from 'svelte';

    import Modal from './Modal.svelte';  // Import the modal component
    import Blog from './Blog.svelte';  // Import the modal component

    const production = true;
    let player; // Variable to hold the player instance
    let loading = true;
    let posts: Post[] = []

    const mediaPath = (x: string) => production ? `https://d2lhdje1f798eq.cloudfront.net/${x}` : x;

    class Post {
        title: string;
        thumbnail: string;
        thumbnail_alt: string;
        media: string;
        captions?: string;
        sort: string;
        type: string;

        constructor(
            title: string,
            thumbnail_path: string,
            thumbnail_alt: string,
            media_path: string,
            sort: string,
            captions_path?: string
        ) {
            this.title = title;
            this.thumbnail = thumbnail_path;
            this.thumbnail_alt = thumbnail_alt;
            if (media_path.startsWith('videos/') || media_path.startsWith('music/')) {
                this.media = mediaPath(media_path);
            } else {
                this.media = media_path;
            }
            this.sort = sort;
            if (captions_path) {
                this.captions = captions_path;
            }
            if (media_path.startsWith('music/')) {
                this.type = 'music';
            } else if (media_path.startsWith('videos/')) {
                this.type = 'video';
            } else if (media_path.startsWith('blogs/')) {
                this.type = 'blog';
            } else {
                this.type = 'unknown';
            }
        }
    }

    onMount(async () => {
        const response = await fetch("manifest.json");
            if (response.ok) {
                const raw_posts = await response.json();
                posts = raw_posts.map((x: any) => new Post(
                    x.title,
                    x.thumbnail_path,
                    x.thumbnail_alt,
                    x.media_path,
                    x.sort,
                    x.captions_path
                ));
                console.log(posts)
            } else {
                console.error('Failed to load posts:', response.statusText);
            }
        loading = false;


        // Target the video element where OpenPlayerJS should be attached.
        const videoElement: HTMLElement | null = document.getElementById('myVideo');

        if (videoElement instanceof HTMLMediaElement) {
            player = new OpenPlayerJS(videoElement, {
        });
        }
    });


    let selectedPost: Post | null = null; // Store the currently selected post

    const closeModal = () => selectedPost = null;
    const openModal = (post: Post) => selectedPost = post; // Set the selected post

    const playerHeight = () => selectedPost?.type === 'music' ? 40 : 360;
</script>
<h2>Musician, Skier, Mountain Biker, Coder, Volunteer</h2>

<Modal open={!! selectedPost} close={closeModal}>
    <div class="media-display">
        <span>{selectedPost?.title}</span>
        {#if selectedPost?.type === 'music'}
        <img src="{selectedPost.thumbnail}" alt="{selectedPost.thumbnail_alt}"/>
        {/if}
        {#if selectedPost?.type === 'blog'}
        <Blog media={selectedPost?.media}></Blog>
        {/if}
        {#if ['video', 'music'].includes(selectedPost?.type ?? '')}
        <video id="myVideo" width="640" height="{playerHeight()}" controls>
            <track kind="captions" src={selectedPost?.captions} srclang="en" label="English" default/>
            <source src={selectedPost?.media} type="video/mp4">
            Your browser does not support the video tag.
        </video>
        {/if}
    </div>
</Modal>

<div class="content-list">
    {#each posts as post}
        <a class="post" on:click|preventDefault={() => openModal(post)} href={post.media}>
            <img src="{post.thumbnail}" alt="{post.thumbnail_alt}"/>
            <span>{post.title}</span>
        </a>
    {/each}
</div>
<style>
h2 {
  text-align: center;
}

.post {
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.post > img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 20px;
}

.post > span {
    max-width: 200px;
    text-align: center;
}

.content-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.media-display {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    padding: 5px;
}

.media-display > img {
    max-width: 640px;
    max-height: 360px;
    object-fit: cover;
    overflow: hidden;
}
</style>
