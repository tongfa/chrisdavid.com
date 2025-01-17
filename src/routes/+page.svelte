<script lang="ts">
    import OpenPlayerJS from 'openplayerjs'; // Import the library
    import { onMount, setContext } from 'svelte';

    let player; // Variable to hold the player instance

    // After the component mounts (onMount or after your data is ready)
    onMount(async () => {
        // Target the video element where OpenPlayerJS should be attached.
        const videoElement: HTMLElement | null = document.getElementById('myVideo');

        if (videoElement instanceof HTMLMediaElement) {
            player = new OpenPlayerJS(videoElement, {
        });
        }
    });


    interface Post {
        title: string;
        thumbnail: string;
        thumbnail_alt: string;
        media: string;
        captions?: string;
    }

    const posts: Post[] = [
        {
            title: "Skiing 2024 Dec 26",
            thumbnail: "videos/Skiing 2024 Dec 26 thumb.png",
            thumbnail_alt: "Thumbnail of skiier with arms out wide",
            media: "videos/Skiing Dec 26 2024.mp4",
            captions: "videos/Skiing Dec 26 2024.vtt"
        },
        {
            title: "Creative Bridges - Oh Christmas Tree Dec 2023",
            thumbnail: "music/2023_11_19_CB_OhChristmasTree.jpg",
            thumbnail_alt: "A penguin ornament on a christmas tree",
            media: "music/2023_11_19_CB_OhChristmasTree.mp3",
        },
    ]

    import Modal from './Modal.svelte';  // Import the modal component

    let selectedPost: Post | null = null; // Store the currently selected post

    const closeModal = () => selectedPost = null;
    const openModal = (post: Post) => selectedPost = post; // Set the selected post

    const playerHeight = () => selectedPost?.media.startsWith('music/') ? 40 : 360;
</script>
<h2>Musician, Skier, Mountain Biker, Coder</h2>

<Modal open={!! selectedPost} close={closeModal}>
    <div class="media-display">
        <span>{selectedPost?.title}</span>
        {#if selectedPost?.media.startsWith('music/')}
        <img src="{selectedPost.thumbnail}" alt="{selectedPost.thumbnail_alt}"/>
        {/if}
        <video id="myVideo" width="640" height="{playerHeight()}" controls>
            <track kind="captions" src={selectedPost?.captions} srclang="en" label="English" default/>
            <source src={selectedPost?.media} type="video/mp4">
            Your browser does not support the video tag.
        </video>
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
