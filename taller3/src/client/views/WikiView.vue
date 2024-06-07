<script>
import NavBar from '@/client/components/NavBar.vue'
export default {
    components: {
        NavBar
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: 'login' });
        },
        goToPrincipal() {
            this.$router.push({ name: 'principal' });
        }
    }
}
</script>

<template>

    <body>
        <NavBar />

        <section id="inicio">
            <h1>Más información acerca de...</h1>
        </section>

        <section id="historia">
            <div class="container">
                <div class="texto">
                    <h2>Luffy</h2>
                    <p>Monkey D. Luffy, más conocido como Luffy "Sombrero de Paja", es el protagonista principal de la
                        serie de manga y anime One Piece.
                        Es el capitán y fundador de los Piratas de Sombrero de Paja así como un de los Cuatro
                        Emperadores que
                        gobiernan los mares del Nuevo Mundo. Comió una fruta del diablo llamada fruta Gomu Gomu, que
                        le convirtió en un hombre de goma.
                    </p>
                </div>
                <div class="img-container">
                    <img src="@/client/media/Personajes/Luffy/luffy_wiki.png" style="width: 350px;" alt="luffy.png">
                </div>
            </div>
            <div class="container">
                <div class="img-container">
                    <img src="@/client/media/Personajes/Zoro/zoro_wiki.png" style="width: 350px;" alt="zoro.png">
                </div>
                <div class="texto">
                    <h2>Zoro</h2>
                    <p>Roronoa Zoro, conocido como El Cazador de Piratas, es el primer pirata que se unió a Monkey D.
                        Luffy, y el principal combatiente de los
                        Piratas de Sombrero de Paja, uno de los oficiales principales de la
                        Gran Flota de Sombrero de Paja, así como un antiguo cazarrecompensas.
                    </p>
                </div>
            </div>
            <div class="container">
                <div class="texto">
                    <h2>Sanji</h2>
                    <p>Sanji, conocido como Pierna Negra y nacido como Vinsmoke Sanji, es el cocinero de los Piratas de
                        Sombrero de Paja, así como uno de los oficiales principales de la Gran Flota de Sombrero de
                        Paja. Es el quinto miembro de la tripulación, y el cuarto en unirse.
                    </p>
                </div>
                <div class="img-container">
                    <img src="@/client/media/Personajes/Sanji/sanji_wiki.png" style="height: 350px;" alt="sanji.png">
                </div>
            </div>
            <div class="container">
                <div class="img-container">
                    <img src="@/client/media/Personajes/Goku/goku_wiki.png" style="width: 350px;" alt="goku.png">
                </div>
                <div class="texto">
                    <h2>Goku</h2>
                    <p>Son Goku es el protagonista principal del manga y anime de Dragon Ball creado
                        por Akira Toriyama. Su nombre real y de nacimiento es Kakarotto y es uno de los pocos
                        saiyanos que lograron sobrevivir a la destrucción total del Planeta Vegeta del Universo 7.
                    </p>
                </div>
            </div>
            <div class="container">
                <div class="texto">
                    <h2>Abuelo Max</h2>
                    <p>Maxwell Tennyson, mejor conocido como Max Tennyson, o Abuelo Max (como sus nietos lo llaman) o
                        solo Max, es el abuelo paterno de Ben, Gwen, Ken y padre de Carl Tennyson y Frank Tennyson. Es
                        un miembro semiretirado de la organización intergaláctica de Los Plomeros. Con 60 años,
                        tiene algo de sobrepeso y un poco lento a veces, pero con un agudo sentido de aventura y un
                        extraño gusto en alimentos asquerosos.
                    </p>
                </div>
                <div class="img-container">
                    <img src="@/client/media/Personajes/Max/max_wiki.png" style="width: 350px;  margin-top: 40px;" alt="max.png">
                </div>
            </div>
            <div class="container">
                <div class="img-container">
                    <img src="@/client/media/Personajes/Terreneitor/terreneitor_wiki.png" style="width: 500px; margin-top: 40px;"
                        alt="terreneitor.png">
                </div>
                <div class="texto">
                    <h2>Terreneithor</h2>
                    <p>Tras un extraño accidente mientras realizaba una ruta de prueba, el unico piloto del poderoso
                        "Terreneithor", del proyecto "H-0T Wheel-5" termino atravezando un misterioso portal por el cual
                        termino en este mundo lleno de peleadores, su unica cualidad es manejar a altas velocidades y
                        controlar a la bestia de 4 ruedas, seguro que si sobrevive y consigue un video mostrando estas
                        peleas se puede llegar a conseguir un mejor trabajo el triple de seguro.
                    </p>
                </div>
            </div>
        </section>

        <section id="final">
            <button @click="goToPrincipal">Volver</button>
        </section>

        <footer>
            <div class="container">
                <p>&copy; All rigths reserved</p>
                <p>Aclaración: No somos los autores ni dueños de ningun material audiovisual, y, por ende, todo material
                    usado
                    es solo para
                    fines demostrativos.
                </p>
            </div>
        </footer>
    </body>
</template>