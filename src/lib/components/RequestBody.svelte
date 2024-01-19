<script lang="ts">
    let body: Record<string, any> = {};

    let content: string;

    function stringToObject(str: string){
        try{
            if(!str ) return {}
        const lines = str.replaceAll('{', '').replaceAll('}', '').replaceAll('\n', '').split(',');
        for(let line of lines){
            let [key, value] = line.split(":")
            key = key.replaceAll("'", "").replaceAll('"', "");
            let isString = value.includes("'") || value.indexOf('"')
            console.log(isString)
            value = value.replaceAll("'", "").replaceAll('"', "");

            body[key] = value;
        }
        console.log(body)
        }catch{

        }
    
    }
    $: stringToObject(content)
</script>

<div class="flex flex-col p-2 gap-2">
    <p>Request Body</p>
    <textarea bind:value={content} class="resize rounded-md"></textarea>
</div>

<style>
    textarea {

        
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    padding: 0.5rem;
    background-color: var(--code-bg-color);
    color: #fff;
    }

</style>