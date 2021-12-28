// Request body
let state = 'c-qaE2UrwG6oBVWIZ9N}pps}1q=;CsiwcMpMZ|)777(ykP{4{UwrHv)nqrDwlbD!dG~M2N@3HsZd->;XmycV@c@X_F`~BbBo!R%MytgxNkIi)umL;zu^@ThONjZO1h9*<7SLEL2minqayVfGp@=Pg7%5wqLPFqWTZKpaRCYbdV`)a*|*dXN~(NlC0DWZqSyggaOi*BN8M!SAyyZzAboL(=`te1e!VC;%4?Dn9&r|6DMv1|`C+wDec0wkx6Ec^8<p~wa;go~8U%5#FSt>`V?Wwoe&C{fBRo2U89vghvoYBHE&i8^CUoK8e?6A>DoRHSm4E<z`2yC)_W2+!LlP#+epGZxlG#7BAC866uKj8Q(i2qCJuC#rUw6sg8R9(CPT2t#`RI4k4v$oQVcdaL7B+dKHjWdFXWx=!XY>ILJ*n*X)^Y3JduwPPhtY%RI9YinGlzT~)c(fBteEiO|t#${@@aT%9BFg@*zo?!!h!+q_I1gQf->X<P|DftyS`xVD&n%$C?&(`)mYj$+j#`pjEE;8MJ|AX%$M|LMFGQiI)3u?X#kC%4EdgWX<0HSlD>ycyq+-L`+ySG(8Nb?+$3te0EgG8+9O6NDz74k~@&b&S(N8`3_?78bZ>$Z>=9CuciEq>Sgn914Y>LYyItY}+5U)6K2sKG4rY4TL(!e%+6%&hS<#u|dP`?@x-)$aFc^{(01J7r-<WbuAh^?9t!*G@BEtsV88w6<;rjUDye8mroI6_yiL{xO`Cv)w~kYlG59F>r)xUPAQ7m=E`IC_{N30I}T1Lnn~`3tgbADbFGYF`avYb5Dp~&>Q+dUnPG}H2r4?(O=1XlR=(917M)(EEk+fLJX1pDMOa?Sq$Z+E&8v3tO%8$GE{-8a=cI-0-=Vo{<HDjJft_wQF0gqb#;(+p&rziIUO{FFlYpgAsm_j36W?Dk<d)}FK7WRAqrZ7{MBm%Mv%X8?V!ElOX=q)unb1ZHs-Jrxe8XpdXNY5CfE#HU@L5c?XUxO!EV?i{SOD>5FCc1@DxtLWw;JE;f|7<F2cdX<@}j<b^2b&y-Y#Yz*<-*eMbF8<WATJ2jB=CgX3@lPQqz8183nJoQDf=5iY?MxC+<chRp3`z5uncAB_w}2FaLVEWt8vkRix8q#u-may*xTd$3>X%2=g71>F(cPbNQ`3duZg_A%#84%|C|J@2_mThxt4j)BtPFXI5_!Z6xuL0K7x=p;c)XabEP7^d@HEV2g3bg(rtQhpE63*u?-1h;6r4R_%_$gP5A;SRpA1l$;-3*-ZKN)aSKC@2ozPzB0@9ztn)01x32bcDxpeWYECFGbdr-wB;8N6wOdq<#{EoB}b_msb7}WL`EC7Qi&>J3?nK^S5By7fNdOg)(Jpc8E6E>m2oVc^nQt%)4d(f#7_H^8bE+$v3MOmj9wc#Y&Z{RIOG$u*UV3GiT3TbgoX_di5JL3~SUlyh%jU$Y#x3w2W%ix{a}IyY@4_dT`0*O2I;}yB01|)a{Koixq#%y@ZEnNiT07-%@_1{Zm&AUmW}BR_&0W$D_&}zSi;P+wq+`j~+9&OV{z;y7%bWt9PGw`X(gyoABMl{z=L2ro8w52OkdnXwu{<Q$L<Ieb6VLem3~?A-nes-TUpn^A|2&jv4UUusc8A{V8<W_rG0TF#oT==k44zYtA2kZmcz8`9HURUFtM)^M)_KUcYYJ+O2W-o^E<JZpZe3)oXtK!TCmkCnwJSd-T|mlc&y{KK_fkA3M8e*e+#+RnYG5<Mg)W-_HR|6UfZ';
let size = 4714;
let hash = 'Q8RQB21m8*>KGITSZD%X`NXIS)l_a?O44)Nko<Hn@KQr9ab0uNGW!}yj>rXrzaC0VJ@+34QLaeoHvnP5';

function visualise(picture) {
  const rows = document.querySelectorAll('p');
  for (const row in picture) rows[row].innerHTML = picture[row]
}

let btnAnimate = document.querySelector('.btn__animate');
btnAnimate.addEventListener("click",
  async () => {
    btnAnimate.disabled = true;

    var div = document.querySelector('.animation');
    while (div.firstChild && div.removeChild(div.firstChild));

    let text = document.querySelector('.text__animate').value;
    let picture = (text.length) ? text.split`\n` : await evaluateAPL(`pic`);

    for (const row in picture) {
      const line = document.createElement('p');
      line.id = `line${row}`;
      document.querySelector('.animation').appendChild(line);
    }

    // Populate the WS with some variables
    const res = await fetch('https://tryapl.org/Exec', {
      'method': 'POST',
      'headers': { "Content-Type": "application/json; charset=utf-8" },
      'body': JSON.stringify([state, size, hash, `(height width safe) ← (⍴,⊂∘⍸∘(<⍀' '∘≠)) (↑⍣≡0∘⎕JSON) '${JSON.stringify(picture)}'`]),
    })
    const data = await res.json();
    [state, size, hash] = data.slice(0, -1);

    for (let i = 0; i < 10; ++i) {
      visualise(picture);
      picture = await evaluateAPL(`next (↑⍣≡0∘⎕JSON) '${JSON.stringify(picture)}'`);
    }

    for (let i = 0; i <= picture.length; ++i) {
      visualise(picture);
      picture = await evaluateAPL(`finish (↑⍣≡0∘⎕JSON) '${JSON.stringify(picture)}'`);
    }

    btnAnimate.disabled = false;
  });
