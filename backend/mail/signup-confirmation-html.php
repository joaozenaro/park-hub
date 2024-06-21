<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user app\models\User */
/* @var $appName string */
/* @var $confirmURL string */

?>
<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FFFFFF;">
    <tbody>
        <tr>
            <td valign="top" class="mcnTextContent" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: left; padding: 36px; word-break: break-word;">
                <div style="text-align: center; margin-bottom: 36px">
                    <?= $appName; ?>
                </div>
                <div style="text-align: left; word-wrap: break-word;">Você foi convidado para cadastrar-se no <?= $appName; ?>! Para confirmar o seu cadastro, siga o endereço abaixo e preencha suas informações
                    <br />
                    <br /><br />
                    <a href="<?= Html::encode($confirmURL); ?>">Clique aqui para confirmar seu cadastro</a>
                    <br />
                    <br />Bem-vindo e muito Obrigado!
                    <br />Park Hub
                    <div class="footer" style="font-size: 0.7em; padding: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: right; color: #777777; line-height: 14px; margin-top: 36px;">© <?= date("Y"); ?> PH
                        <br>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>