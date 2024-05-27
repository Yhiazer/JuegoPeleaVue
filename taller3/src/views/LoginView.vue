<template>
    <NavBar /> 
    <div class="limiter">
        <div class="container-login">
            <div class="login">
                <form class="login-form">
                    <span class="titulo">
                        Inicio de Sesión
                    </span>
                    <div class="container-input">
                        <input class="input" type="text" name="email" placeholder="Email">
                    </div>
                    <div class="container-input">
                        <input class="input" type="password" name="pass" placeholder="Contraseña">
                    </div>
                    <div class="container-boton">
                        <button class="boton">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}


input {
    outline: none;
    border: none
}

/*No borrar*/


button {
    border: none;
}

button:hover {
    cursor: pointer
}

.container-login {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
}

.login {
    width: 50%;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.login-form {
    width: 100%
}

.titulo {
    margin: 30px;
    display: block;
    font-size: 30px;
    color: #555;
    line-height: 1.2;
    text-align: center
}

.container-input {
    padding: 10px;
    width: 100%;
    position: relative;
    background-color: #fff;
}

.input {
    display: block;
    border: 1px solid #d6d6d6;
    width: 100%;
    background: 0 0;
    font-size: 15px;
    color: #666;
    line-height: 1.2
}

input.input {
    height: 68px;
    padding: 0 25px
}

.container-boton {
    width: 100%;
    display: flex;
    flex-wrap: wrap
}

.boton {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    background-color: rgb(61, 176, 88);
    font-size: 14px;
    color: #fff;
    line-height: 1.2;
    -webkit-transition: all .4s;
    -o-transition: all .4s;
    -moz-transition: all .4s;
    transition: all .4s
}

.boton:hover {
    background-color: rgb(103, 206, 127);
}
</style>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    components: {
        NavBar
    }
}
</script>