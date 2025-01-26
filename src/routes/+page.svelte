<script lang="ts">
    import OpenPlayerJS from 'openplayerjs'; // Import the library
    import { onMount } from 'svelte';

    import Modal from './Modal.svelte';  // Import the modal component
    import Blog from './Blog.svelte';  // Import the modal component

    let player; // Variable to hold the player instance
    let loading = true;
    let posts: Post[] = []

    const mediaPath = (manifest_path: string) => {
        if (manifest_path.startsWith('videos/') || manifest_path.startsWith('music/')) {
            return `https://d2lhdje1f798eq.cloudfront.net/${manifest_path}`;
        } else {
            return manifest_path;
        }
    }

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
            this.thumbnail = mediaPath(thumbnail_path);
            this.thumbnail_alt = thumbnail_alt;
            this.media = mediaPath(media_path);
            this.sort = sort;
            if (captions_path) {
                this.captions = mediaPath(captions_path);
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

    const playerWidth = () => Math.min(640, window.innerWidth * 0.9);
    const playerHeight = () => selectedPost?.type === 'music' ? 60 : playerWidth(); // a square player makes the controls big
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
        <video id="myVideo" width="{playerWidth()}" height="{playerHeight()}" controls>
            <track kind="captions" src={selectedPost?.captions} srclang="en" label="English" default/>
            <source src={selectedPost?.media} type="video/mp4">
            Your browser does not support the video tag.
        </video>
        {/if}
    </div>
</Modal>

{#if !selectedPost}
<div class="content-list">
    {#each posts as post}
        <a class="post" on:click|preventDefault={() => openModal(post)} href={post.media}>
            <img src="{post.thumbnail}" alt="{post.thumbnail_alt}"/>
            <span>{post.title}</span>
        </a>
    {/each}
</div>
{/if}

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
