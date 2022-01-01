// Game propriety
const MIN_WIDTH = 10;
const MAX_WIDTH = 13;
const DEFAULT_INP_VALUE = 0;
const DEFAULT_OUT_VALUE = 0;

// Request body
const state = 'c-pO(2UrwG6vt-|I1~kuAd+AX4zM9Mu;8ijtSDeFXF<J#(^COg?vA6X#1_+xC7KvhtkFcHF)^BA?7jDH?7jD{`OodFpDed7nC$oc?(M#rc{8)G?A(djB}l=`ok^9S){n}Cs|qzaFHa`-cPKbswCB;4xV&Dl%gUa8L_6IJj+ai#5i(X7FVUAEo2bkouJze6dPiZs)4p9?zo?H9^ftniRE+9JtS-k1?S<zV;?%m*4|J*LNs3GTU}BQdyWU3{`rBRfPm_5csn~&Qy`+DPpzkkZ$BccYz54!`J{dd9WOKM0mn89fX(sP9Gq#{IfIUZXf^-wduPSJ-Oel*pQnY@m|F{n&`&<$Gkz)EqE>4nU?8wEBTzooY?8wFKVA=J%)~6LSuH^Dq%=@ZLt{`gR#@fs2EkXu?abPOg3NBHv!!7kdQxMBphUn6*HnZKFVRo1^%~|GbbB;OJoM*|>C3+jm*(?s7k0CtElBXkNL=ev<=;M5R43V+!Tmm8K8s6bHTpQ(MP-)}xEre@DcyB{saGu4k<H+J5-Wbg#m{eh2Zh9_(BhxiJN7hp#No5ToRk(y?jx5#iYJIGiFyewRfv-L`KfuqRa;WI2JsRF_$wupoAl{*ZI!qf!^*1$qtlg5U<2dar>oP`R0XCB_dT=E%9~Vs<BjYeApW`ZFOg6S`jIx<j>F&7}LMD0eL{j&HD+`jnO=8YArSj-HzvTvJAXO9l>q*F~`6|Y_O7flfzb?7_kZTw7q^NaAE^mlzKBT_3-JxJ#%qRKzmG=Mo_8f)wY=!nT1%HTsx3M~1ian1|$nQ6;hhkk;{BA3McM5zb-}HO$%k=MwnUY=uKhYqIIO~epSy(I?x?n4w(GbrvRgFxg1*D;dhc+pQkJjo{UO^-w)2Z&L;q}Idun?Or(Q490MH$tGkhl<&Rr3Co@^v}O*8oYrdPw}>S<Ji>{Xi7XQKX1|k+UPdXC?nBU2^AD(SPOD1>^Z;JeCvWv}!ZPOdF+ctQ4ox@BT}@|LgT$q-c2{_LtMUDeTunvR|nkF^-hpn_6N=toNftJN~5LhS}Mk?$aBDuy?Iya|D5spk5duDKJ(M_jD;ac+LQQac^SvI@uY21i2~H6NEV#00y$JeG03KX{>(o&N_?Kq{jkhObPLs!Rm9SGh2mPn8TJ#_p=DlY)-}ewIFNL^C!#hI-o9HFQ^Y<Km+#vXTo=LAj82d`b_r;T~o+rpgEw$vL$E*VnJ)r2E>7QfC@m`f_9)ips&9p=ma{0E`a{U>IMve{(b5JdNN;9KR*M@z;N1zJ*<XY1J;6#fF|M=b}HHiwu2pDC)fq{fW2TJ^*=Zaj)0@!ICu`ufUDppxDD=sT(AHR9!mF*eb>j_^Kef~{W`E7Y@j}aelz55Z~z<v$G{125}X33!C7z)oCg=cMRtn246cA{;5xVgZUK7os|lLGej=nEvJs6LtfeuHn^0P>2{A%e0hK{@cBXj%4$`qSR-w0J>@eI<(BhZ`Y<S*^;EbU0jC(KOiGG397X9u)js#Uf1dRhQ8|0y_A&8`Lh%r{s3B-dopfQ+&etjVu04?<|WILJ<U=T2&Jqg@F+g)%UJOs2<pqXeuC9nhpVvW9_H1G$FXhMMsARN>Ikw69XXnF)5gD0R5cuL<7wF~1*A$2rQFv&{D8Pt!^kH;b>g5F`m`MWpGdoUf$1(Tug1CqmpTyWNfP)S{=7OCr%sP^Pasyy6E9DeM+?ckxtrH^?3@o>oxYv$GXx>oI|=sI=l)sJa#bM^F@vlm=w+N^ntmaSr2w~32SXxpxRhmM^(cj?;A(7i{`Y2QA&;(M*E-&_9W0?G%z{Z3GYcQwHw+R(7@ij^u?sTz^HYUrZAPwq5%uhG-|>PK(%x&6K=DS5=mQRaSQ`dbDJ9F&s!LE2z`$k_QG;@`kW_K!dLbe!X}@e?La`h4<~%rCy2n)Oxo-hDaye>`yU(&ekYGfL&%`}zK2{j#5azdrZ-<$urFy=TU(KmXd?aM;QfcYj;zHGJ!)Z@$~OVaNLI#s|;0ycoS}XU(<iepy)Nmd~?O=l?l=;@Igk=gyw|RjkKlG=<6~jj&qM`aW7!yz}zEl9%g>';
const size = 4578;
const hash = '*x2?I=d2Ul4aY59<CYbo^7l7CLvu8YUm)`Xotj(=k;y$Ik;Gq(gfEZcu$0n+AYNe*nyr<e$wU_k0VYSN';

function getInpMatrix() {
  return Array.from(document.querySelectorAll('.tableInp tr')).map(
    item => Array.from(item.querySelectorAll('.inp')).map(
      x => +x.value || DEFAULT_INP_VALUE
    )
  )
}

async function trySolve() {
  let matrix = getInpMatrix();

  let solution = await evaluateAPL(`solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`);
  if (solution.length) {
    session_style(3);
    document.querySelector(".tryLabel").innerText = "Solve";
    makeTryTable('number', matrix);
  } else { // ?Useful
    session_style(1);
    alert("This puzzle hasn't got an answer...");
  }
}

async function solve() {
  let matrix = getInpMatrix();

  let solution = await evaluateAPL(`solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`);
  if (solution.length) {
    let input = solution.map(item =>
      item.split` `.filter(x => x !== "").map(x => +x)
    )
    session_style(2);
    makeOutTable(input);
  } else { // ?Useful
    session_style(1);
    alert("This puzzle hasn't got an answer...");
  }
}

async function create() {
  alert("You can't create this puzzle");
}

async function verify() {
  let matrix = getInpMatrix();

  let try_matrix = Array.from(document.querySelectorAll('.tableTry tr'))
    .map(item =>
      Array.from(item.querySelectorAll('.try'))
        .map(x => +x.value || DEFAULT_OUT_VALUE)
    )

  let result = await evaluateAPL(`solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`);
  let solution = result.map(item => item.split` `.map(x => +x))

  if (JSON.stringify(solution) === JSON.stringify(try_matrix)) document.querySelector(".tryLabel").innerText = "Correct!";
  else document.querySelector(".tryLabel").innerText = "Wrong!";
}