<script>
    import { slugify } from "@utils/slugify";
    import Fuse from "fuse.js";
    import { onMount } from "svelte";

    /** @type {import('astro:content').CollectionEntry<"blog">[]} */
    export let posts;

    $: fuse = new Fuse(posts, {
        keys: ["data.title", "data.description", "data.tags"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.2,
    });

    let query = "";
    /** @type {Fuse.FuseResult<import('astro:content').CollectionEntry<"blog">>[]} */
    let queryResults = [];
    /** @type {HTMLInputElement} */
    let inputRef;

    let usePagefind = false;

    const handleSearch = () => {
        if (query.length > 1) queryResults = fuse.search(query);
        else queryResults = [];

        if (query.length) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("q", query);
            const newRelativePathQuery =
                window.location.pathname + "?" + searchParams.toString();
            history.replaceState(null, "", newRelativePathQuery);
        } else {
            history.replaceState(null, "", window.location.pathname);
        }
    };

    onMount(() => {
        const searchUrl = new URLSearchParams(window.location.search);
        const searchStr = searchUrl.get("q");
        if (searchStr) query = searchStr;

        // auto focus
        inputRef.selectionStart = inputRef.selectionEnd =
            searchStr?.length || 0;

        if (query.length > 1) queryResults = fuse.search(query);
        else queryResults = [];
    });
</script>

<div class="mt-8 form-control">
    <label class="mb-1 label cursor-pointer justify-start">
        <span class="label-text mr-2">Search by pagefind</span>
        <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={usePagefind}
        />
    </label>

    <div class:hidden={!usePagefind}>
        <slot name="pagefind" />
    </div>

    <input
        bind:this={inputRef}
        bind:value={query}
        autocomplete="off"
        type="text"
        placeholder="Search for anything..."
        class:hidden={usePagefind}
        class="input input-lg input-bordered input-primary w-full block placeholder:italic"
        on:keydown={(e) => e.code === "Enter" && handleSearch()}
        on:blur={() => handleSearch()}
    />
</div>

{#if queryResults.length}
    <p class="my-8">Found {queryResults.length} results for '{query}'</p>

    <ul class="grid gap-4 grid-cols-1 md:grid-cols-2">
        {#each queryResults as { item }}
            {@const data = item.data}
            {@const isNotes = data.tags.includes("notes")}

            <li>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={data.heroImage} alt={data.title} />
                    </figure>

                    <div class="card-body">
                        <h2 class="card-title">
                            <a
                                class="link"
                                href={`${
                                    import.meta.env.BASE_URL
                                }posts/${slugify(data)}`}
                            >
                                {data.title}
                            </a>

                            <div class="badge badge-secondary">
                                {isNotes ? "Note" : "Writting"}
                            </div>
                        </h2>

                        <p>{data.description}</p>

                        <div class="card-actions justify-end">
                            {#each data.tags as tag}
                                <div class="badge badge-outline cursor-pointer">
                                    <a
                                        href={`${
                                            import.meta.env.BASE_URL
                                        }tags/${tag.toLowerCase()}`}
                                    >
                                        {tag}
                                    </a>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
{/if}
