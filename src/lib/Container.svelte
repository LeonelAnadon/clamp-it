<script>
  import { value, currentUnity, clampValues, defaultValues } from "./store";
  import gear from "../assets/gear.svg";

  let isConfig = false;
  function handleToggleMenu (){
    isConfig = !isConfig
  }

  $: console.log($clampValues);
</script>

<div class="container">
  {#if $currentUnity !== "clamp"}
  <div class="input-container">
      <input
        type="number"
        placeholder={`Escriba el valor en ${$currentUnity}`}
        autocomplete="off"
        bind:value={$value}
      />
      
    </div>
  {:else}
  
  <div class="input-clamp-container">
    <div class="input-label-container">
      <input
      id="valor"
        type="number"
        placeholder="..."
        autocomplete="off"
        bind:value={$clampValues["valor"]}
        />
        <label for="valor">Valor</label>
      </div>
      <div class="input-label-container">
        <input
        id="ratio"
        type="number"
        placeholder="..."
        autocomplete="off"
        bind:value={$clampValues["ratio"]}
        />
        <label for="ratio">Ratio</label>
      </div>
      <div class="input-label-container">
        <input
        id="minimo"
        type="number"
        placeholder="..."
        autocomplete="off"
        bind:value={$clampValues["minimo"]}
        />
        <label for="minimo">Mínimo</label>
      </div>
      <div class="input-label-container">
        <input
        id="maximo"
        type="number"
        placeholder="..."
        autocomplete="off"
        bind:value={$clampValues["maximo"]}
        />
        <label for="maximo">Máximo</label>
      </div>
    </div>

      {/if}
      
  <div style="display: flex; flex-direction: column;">
    <div class="btns-container">
      <button
      class:active={$currentUnity === "px"}
      on:click={() => ($currentUnity = "px")}>px</button
      >
      <button
      class:active={$currentUnity === "vw"}
        on:click={() => ($currentUnity = "vw")}>vw</button
      >
      <button
        class:active={$currentUnity === "rem"}
        on:click={() => ($currentUnity = "rem")}>rem</button
      >
      <button
        class:active={$currentUnity === "pt"}
        on:click={() => ($currentUnity = "pt")}>pt</button
      >
      <button
        class:active={$currentUnity === "clamp"}
        on:click={() => ($currentUnity = "clamp")}>clamp()</button
      >
      <div class="gear-container" >
        <img alt="configuracion" src={gear} on:mousedown={handleToggleMenu} style={`transform: rotateZ(${isConfig ?  0: 180}deg);`} />
      </div>
    </div>
    <div class="hidden-config" style={`height: ${isConfig ? 3 : 0}rem;`}>
      <input type="number" disabled />
      <input type="number"   bind:value={$defaultValues["vw"]} />
      <input type="number"  bind:value={$defaultValues["rem"]} />
      <input type="number" disabled />
      <input type="number" disabled />
    </div>
  </div>
</div>

<style>

  .input-container {
    display: flex;
    max-width: 60rem;
    gap: 1rem;
  }
  .input-container input {
    flex: 1;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 1.1rem;
    background-color: transparent; 
    border: 1px solid #7e7e7e;
  }
  .input-clamp-container {
    display: flex;
    max-width: 60rem;
    gap: 1rem;
  }
  .input-label-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 0;
    gap: 0.2rem;

  }
  .input-label-container input {
    order: 2;
  }
  .input-label-container label {
    font-size: 0.8rem;
    order: 1;
  }
  .input-clamp-container input  {
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 1.1rem;
    background-color: transparent; 
    border: 1px solid #7e7e7e;
  }

  .btns-container {
    display: flex;
    user-select: none;
  }



  .btns-container button {
    flex: 1;
    border: 1px solid transparent;
    padding: 0.6em 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #7e7e7e;
    cursor: pointer;
    transition: border-color 0.25s;
    /* max-width: 10rem; */
  }

  .container button:hover {
    border-color: #f5830c;
  }

  .container button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  .active {
    background-color: #f5830c !important;
    color: black;
    font-weight: bold !important;
  }
  .gear-container {
    position: relative;
    display: grid;
    place-content: center;

  }
  .gear-container > img {
    position: absolute;
    padding: 0 0.5rem;
    cursor: pointer;
    max-width: 2rem;
    top: .3rem;
    /* transform: rotateZ(0deg); */
    transition: all 300ms linear;
  }
  .hidden-config {
    padding: 0rem 0;
    position: relative;
    height: 3rem;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    transition: height 100ms linear;
  }
  .hidden-config > input {
    all: initial;
    font-family: inherit;
    flex: 1;
    width: 0%;
    margin: 0;
    padding: 0;
    border: 1px solid #7e7e7e;
    border-top: none;
    border-radius: 0;
    text-align: center;
    color: #ccc;
  }
</style>
