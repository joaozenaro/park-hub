# Yii API + React SPA: App Estacionamento

> CC 5a Fase. Cada grupo deverá desenvolver uma aplicação para **gerenciamento de um estacionamento** utilizando o Framework definido por sorteio.

## Framework Definido
<p align="center">
    <a href="https://www.yiiframework.com/" target="_blank">
        <img src="https://www.yiiframework.com/image/yii_logo_light.svg" width="400" alt="Yii Framework" />
    </a>
</p>

[Yii2 Docs](https://www.yiiframework.com/doc/guide/2.0/en)

## Tech stack

<div align=center>
  
![Yii](https://img.shields.io/badge/yii-ebf1f2.svg?style=for-the-badge&logo=data:image/png%2bxml;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACslBMVEUAAADxiiqDyTOEyTOYvTHXmSzyiiyDyDQyrvFXu61As9hmv1ZQtbBAs9nxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiirxiiqDyTODyTODyTODyTODyTPxiirxiiqDyTODyTODyTODyTODyTODyTODyTODyTODyTODyTPxiirxiirxiirxiiqDyTODyTODyTODyTPxiirxiirxiirxiiqDyTODyTODyTODyTODyTPxiirxiirxiirxiiqDyTODyTODyTODyTODyTPxiirxiirxiirxiiqDyTODyTN7zjT2hyrxiirxiiqDyTODyTOAyzPyiSrxiirxiiqDyTODyTODyTOAxzXtiivxiirxiiqDyTOAwDmDtj3ziSrxiirxiiqDyTN8uj3rjCvxiirxiirxiiqDyTODyTN/uTyVsDnziSrxiiqDyTODyTN7uj30iSrxiirxiiqDyTODyTN9uj3ikC3xiirxiirxiiqDyTODyTODyTODyTODyTODyTODyTODyTN+uTyxpDXyiirxiirxiiqDyTODyTODyTODyTOEyTF8x0Rxu19/uTySsTrziSrxiio+stxCs9J/uTuLtDv0iSrxiipAs9hAs9h6uUiJtTj7hinxiipAs9hAs9hZtZt6uUpAs9hAs9hDs9FTtahAs9hAs9hAs9hAs9lAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9hAs9jxiiqDyTODyDSAvDqCxTV/ujyBwTd/uTyAvTqDyTKDxDR/uTt8uUSAuTpRta5rt259uUBAs9g/s9pCs9JatpdAs9n///+bs/oNAAAAz3RSTlMAAAAAAAAAAAAAAAAAACq+nxcow/2pGLkMAoX5aDLm0hwBBQgGAoJjK2eXs724o3xGFQa0pgMZz/ciCL3PEhzd/tgLAaHhIBHN+Z4aZv7kIwOqGyDbG3CpEITCCy3m/Xst45CW5zqV90sqmULwyRNT6+U4t3JX33Nv0B0x7LVC8fhhBzR2rdDk8fvfO9iiCgQSIzZQiPLyR8QkbPr6WKNMNuL9YDMED7P8VGL6+EUKueksI+PCDTPvdDTwzx0o6O1RFtTsZgIGsvvHS4TTdRseJWuXAAAAAWJLR0TlWGULvwAAAAd0SU1FB+UFDQsVOKM1xlcAAAHZSURBVDjLY2DAAhgZ+fgFBBkZGXAARkYh4fMiomI4VTAKip8HAgEJHAoYJaVA8uelZXAYwSgrB1ZwXl4BpoBJUUlZRZWJGeoCNYj8eRF1sBFMqhqaWto6unr6BoaKTEAFRsZQBedNTMEKzMwvQICFub4lExOjlTVMgY0tWIGd/QUYcHDUdGJxdoEpcHUDK3D3uIAAnl7erD6+UAV+/mAFAYEXkIF2UHAIVEFIKFgBUxiKggvhEZFQBVHRYH8yxcSiKIiLT0iEKEiChBRTQDKqESmpaWD59AxGNrACpkxHZPmLl7Kyc0AKcvOgIcnElF+ApODylcKiYqC8bwk8LphUS8sQCq5eu1ZeAVRQWYWIKyamar0amA3Xr12rras/39CIHJnsTE3NLa1t7R2dN27eunatq7vnfG8fWmQzMfVPmDhp8pSpt+9cmzZ9hvxMrKmBg3PW7Lv37s+ZO28+VnkurgULHzx89HjR4iVLsaYmrmXLHzx48OTJipXc2OW5Vq1+AFKxZi0P1tTItW79AzDYsJEXu4JNmyEKtmzlwq5g23aIgh1cOBTs3AWW370HuzwD1959IPn9B7hwKTh4CCh/+MhRHPIMXMeOPzhx8hROeWA4nD5z9hyq+QAq/D4JY4faeAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNS0xM1QxMToyMTo1NiswMDowMFdXIWsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDUtMTNUMTE6MjE6NTYrMDA6MDAmCpnXAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

# Overview

```js
// TODO: Explicar os diretorios, escolha da stack, o fluxo das requests, organização, como o container funciona..
```

<details>
<summary>

# Instalação
</summary>
<br>

## Instalação para Windows

Irei detalhar o ambiente de desenvolvimento em [Dev Containers](https://containers.dev/) utilizando docker para um ambiente totalmente isolado e reproduzível.

Refira-se ao [overview](#overview) do projeto para mais detalhes sobre.

Caso prefira se encorajar a instalar o PHP, Composer, MySQL, Node e NPM, ou mesmo XAMPP na própria máquina, fique a vontade! *Boa sorte!*

> Obs.: O guia a seguir é para executar a instação do [WSL](https://aka.ms/wsl), que recomendo altamente para desenvolvedores em Windows.

### Instalar [WSL](https://aka.ms/wsl): Debian

Powershell (Admin):
```powershell
PS> wsl --install -d debian
```
Após instalado, execute as etapas de instalação e configure seu usuário linux. Então, em sua nova máquina Debian, continue:
> Obs.: Recomendo que utilize um aplicativo de terminal. Ex.: [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?rtc=1&hl=en-us&gl=US)

### Instalar [Docker Engine](https://docs.docker.com/engine/install/)
1. Caso seja **sua primeira vez** instalando o docker, é possível executar o script auxiliar **oficial** para facilitar a instalação:
```bash
curl https://get.docker.com/ | sh
```
2. Após instalado, talvez seja necessário permitir que o Docker possa executar seus serviços, tradicionalmente através do *systemd*. 
  * [O que é o systemd?](https://learn.microsoft.com/pt-br/windows/wsl/systemd#what-is-systemd-in-linux)
  * [Habilitar systemd](https://learn.microsoft.com/pt-br/windows/wsl/systemd#how-to-enable-systemd)
3. O Docker inicialmente precisa de privilégio de *super usuário*, nesse sentido, siga as instruções da [habilitar acesso ao seu usuario](https://askubuntu.com/a/477554).

```bash
$ sudo groupadd docker
$ sudo gpasswd -a $USER docker
$ docker run hello-world # Se esse comando funcionar corretamente sem 'sudo', parabéns! Está tudo devidamente configurado. 
```

## Configuração [VS Code](https://code.visualstudio.com/)

### Extensões
* [VS Code: Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
* [VS Code: Remote Dev Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

## E, finalmente!
Clone o repositório do github
```
git clone git@github.com:JoaoZenaro/yii-estacionamento.git
```

Abra o diretório clonado com vscode
```bash
code yii-estacionamento/
```

Abra o Dev Container!

$$
Ctrl + Shift + P \longrightarrow \textrm{Dev Containers: Rebuild and Reopen in Container}
$$

[Docs](https://code.visualstudio.com/remote/advancedcontainers/develop-remote-host#_connect-using-the-remote-ssh-extension)

</details>

# Requisitos da aplicação

* Níveis de acesso (Admin / User)
* Login
* Planos (pré-pago / pós-pago)
* Cadastro de vagas
* Utilização de vagas (permanência para cobrança)
* Consulta de vagas disponíveis no momento
* Fluxo de veículos (entrada / saída)
* Relatórios sobre movimentação financeira
