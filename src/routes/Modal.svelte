<script lang="ts">
//
// This started out as a modal, but isn't anymore in order to be more mobile centric.
// TODO: Rename this to content display or something.
//
    export let open = false; // Control modal visibility
    export let close: () => void; // Function to close the modal
</script>

{#if open}
<div class="modal-overlay">
    <div>
        <button on:click={close}>Close</button>
        <div class="modal-content">
            <slot />
        </div>
    </div>
</div>
{/if}

<style>
    .modal-overlay {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* Ensure modal is on top */
        max-width: 95vw;
    }

    .modal-overlay > div {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Add a shadow */
    }

    .modal-overlay > div > button {
        align-self: flex-end;
    }

</style>
