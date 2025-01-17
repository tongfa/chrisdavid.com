<!-- Modal.svelte -->
<script lang="ts">
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
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* Ensure modal is on top */
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
