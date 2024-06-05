<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    goToGame() {
      this.$router.push({ name: 'game' });
    }
  }
}
</script>

<template>

  <body>
    <header>
      <div class="container">
        <router-link to="/login">
          <img src="@/client/media/logo.png" width="100px" alt="logo.png" style="cursor: pointer;">
        </router-link>
        <nav>
          <a href="#historia">Historia</a>
          <a href="#tutorial">Tutorial</a>
          <a href="#final">Jugar</a>
        </nav>
      </div>
    </header>

    <section id="inicio">
      <img src="@/client/media/logo.png" alt="logo.png">
      <button @click="goToLogin">Jugar</button>
    </section>

    <section id="historia">
      <div class="container">
        <div class="texto">
          <h2>Historia</h2>
          <p>Durante la pelea final en Elbaf, Barba Negra se vio acorralado por los Sombreros de Paja, ante tal
            desesperación consigue lo impensable,
            el despertar de la Yami Yami no Mi junto con la Gura Gura no Mi, desatando un poder colosal que rompio todas
            las barreras del sentido común.
            <br> Con tal poder Barba Negra hizo colapsar multiples realidades, trayendo consigo impresionantes
            personajes de
            realiades distantes con el solo
            objetivo de obtener aun mas poder y volverse imparable ante la amenaza que representan los Sombreros de
            Paja.
            <br>¿Podrá Luffy y sus compañeros
            hacerle frente a esta nueva amenaza, conseguira más aliados o los derrotara antes de que Barba Negra lo haga
            para extraerle su poder?
          </p>
        </div>
        <div class="img-container">
          <video src="@/client/media/dbzop_mute.mp4" autoplay="true" muted="true" loop="true" width="720px"
            poster="@/client/media/luffyvsgoku.png"></video>
        </div>
      </div>
      <div class="cont">
        <button>+ Informacion</button>
      </div>
    </section>

    <section id="tutorial">
      <div class="container">
        <h2><span class="color-acento">Antes</span> de Jugar</h2>
        <div class="informacion">
          <div class="carta">
            <h3 class="color-acento">Controles</h3>
            <p><span style="font-weight: bold;">Jugador </span> 1 <br>
              <span style="font-weight: bold;">Movimiento:</span> W, A, S y D<br>
              <span style="font-weight: bold;">Teleportación:</span> C<br>
              <span style="font-weight: bold;">Jugador </span> 2 <br>
              <span style="font-weight: bold;">Movimiento:</span> Flechas de dirección<br>
              <span style="font-weight: bold;">Teleportación:</span> Num 0<br>
            </p>
          </div>
          <div class="carta">
            <h3 class="color-acento">Mecanicas</h3>
            <p>Cada cierto periodo de tiempo el atributo
              de ataque de
              ambos peleadores subira de manera aleatoria, haciendolos mas poderosos, pero existe la posibilidad de que
              falles tu ataque, como de que aciertes un golpe critico. <br>
              Tambien existe la habilidad de teletransporte, aunque no abuses de ello podrias terminar al lado de tu enemigo.</p>
          </div>
          <div class="carta">
            <h3 class="color-acento">Personajes</h3>
            <p>La grieta dimensional que genero Barba Negra atrajo a peleadores de distintos universos, tales como
              Dragon Ball Z, Ben 10, hasta
              incluso Hot Wheels, sin olvidar a la trio monstruoso de los Sombreros de Paja. ¿Quien sera capaz de
              alzarce ante Barba Negra y
              quedarse con la victoria?
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="final">
      <h2>¿Listo para Jugar?</h2>
      <button @click="goToGame">Jugar</button>
    </section>

    <footer>
      <div class="container">
        <p>&copy; All rigths reserved</p>
        <p>Aclaración: No somos los autores ni dueños de ningun material audiovisual, y, por ende, todo material usado
          es solo para
          fines demostrativos.
        </p>
      </div>
    </footer>
  </body>
</template>