<script>
  import { value, currentUnity, clampValues, defaultValues } from "./store";

  let theValue = [];
  let copied = null;
  let copiedClamp = false;
  let clampText = `clamp()`


  function convert(value, unity) {
    let px =
      unity === "px"
        ? value
        : unity === "rem"
        ? value * $defaultValues?.rem
        : unity === "vw"
        ? value * ($defaultValues?.vw / 100) : unity === 'vh' ? value * ($defaultValues?.vh / 100)
        : unity === "pt"
        ? value * 1.33
        : 0;
    let rem = unity === "rem" ? value : 0;
    let vw = unity === "vw" ? value : 0;
    let vh = unity === "vh" ? value : 0;
    let pt = unity === "pt" ? value : 0;

    rem = px / $defaultValues?.rem;
    vw = (10 * px) / ($defaultValues?.vw / 10);
    vh = (10 * px) / ($defaultValues?.vh / 10);
    pt = px / 1.33;

    rem = Number(rem.toFixed(2));
    px = Number(px.toFixed(2));
    pt = Number(pt.toFixed(2));
    vw = Number(vw.toFixed(2));
    vh = Number(vh.toFixed(2));
    return [{ px, pt, vw, vh, rem }];
  }
  $: if ($value && $currentUnity !== 'clamp') theValue = convert($value, $currentUnity);


  function convertClamp (value = 0) {
    const ratio = value / $clampValues.ratio
    const medio = (ratio * 100).toFixed(2)
    const maximo = (ratio * $clampValues.maximo).toFixed(2)
    const minimo = (ratio * $clampValues.minimo).toFixed(2)

    clampText = `${minimo}px, ${medio}vw, ${maximo}px`


  }
  $: if($currentUnity === 'clamp') convertClamp($clampValues.valor)

  function copyValue(value = 0, i = 0) {
    navigator.clipboard.writeText(String(value));
    copied = i;
    setTimeout(() => {
      copied = null;
    }, 2000);
  }
  function copyClampValue () {
    navigator.clipboard.writeText(String(`clamp(${clampText});`))
    if(!copiedClamp)
    copiedClamp = true
    setTimeout(() => {
      copiedClamp = false
    }, 2000)
  }
</script>

{#if $currentUnity === "clamp"}
  <div class="container clamp-v">
    <p class="clamp-text-p">clamp(<b class="clamp-text-b">{clampText}</b>);</p>
    <button class="btn-clamp-copy" class:copiedClamp on:click={copyClampValue}>{copiedClamp ? 'Copiado' : 'Copiar'}</button>
  </div>
{:else}
  <div class="container">
    <table>
      {#if Boolean(theValue?.length)}
        <tr>
          {#each Object.entries(theValue[0]) as unities ((Math.random() * 114).toString(16))}
            <th>{unities[0]}</th>
          {/each}
        </tr>
        <tr>
          {#each Object.entries(theValue[0]) as unities ((Math.random() * 114).toString(16))}
            <td>{unities[1]}</td>
          {/each}
        </tr>
        <tr>
          {#each Object.entries(theValue[0]) as unities, i ((Math.random() * 114).toString(16))}
            <td
              class="copy-btn"
              class:copied={copied === i}
              on:mousedown={() => copyValue(unities[1], i)}
              >{copied === i ? "Copiado" : "Copiar"}</td
            >
          {/each}
        </tr>
      {/if}
    </table>
  </div>
{/if}

<style>
  .container {
    padding: 1rem 0;
  }
  table {
    border-collapse: collapse;
    border: 1px solid #f5830c;
    border-bottom-left-radius: 3rem;
  }
  p {
    margin: 0;
    padding: 1rem 0;
    font-size: 1.4rem;
    font-weight: bold;
  }

  th,
  td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #f5830c;
  }

  .copy-btn {
    user-select: none;
    cursor: pointer;
    background-image: linear-gradient(45deg, #f5830c 50%, transparent 50%);
    background-position: 90%;
    background-size: 400%;
    transition: background 200ms linear;
  }
  .copy-btn:hover {
    background-position: 0;
    color: black;
  }
  .copied {
    background-position: 0;
    color: black;
  }
  .btn-clamp-copy {
    flex: 1;
    border: 1px solid #ccc;
    font-size: 1.1rem;
    font-weight: 500;
    font-family: inherit;
    background-color: transparent;
    cursor: pointer;
    max-width: 25rem;
    padding: .8rem 5rem;
    border-radius: .5rem;
    align-self: center;
    background-image: linear-gradient(45deg, #f5830c 50%, transparent 50%);
    background-position: 90%;
    background-size: 400%;
    transition: background 200ms linear;
  }
  .btn-clamp-copy:hover {
    background-position: 0;
    color: black;
    border: 1px solid transparent;

  }
  .copiedClamp {
    background-position: 0;
    color: black;
  }
  .clamp-text-p {
    font-size: clamp(16.15px, 1.45vw, 27.87px);
    color: #f5830c;
  }
  .clamp-text-b {
    color: white;
  }
</style>
