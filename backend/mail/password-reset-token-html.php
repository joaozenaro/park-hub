<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user app\models\User */
/* @var $appName string */
/* @var $resetURL string */

?>
<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FFFFFF;">
    <tbody>
        <tr>
            <td valign="top" class="mcnTextContent" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: left; padding: 36px; word-break: break-word;">
                <div style="text-align: center; margin-bottom: 36px">
                    <?= $appName; ?>
                </div>
                <div style="text-align: left; word-wrap: break-word;">Olá, <?= Html::encode($user->username) ?>,<br />
                    <br />
                    <br />Clique no link abaixo para redefinir sua senha:
                    <br /><br />
                    <a href="<?= Html::encode($resetURL); ?>"><?= $resetURL; ?></a>
                    <br />
                    <br />Bem-vindo e obrigado!
                    <br />Park Hub
                    <div class="footer" style="font-size: 0.7em; padding: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: right; color: #777777; line-height: 14px; margin-top: 36px;">© <?= date("Y"); ?> Park Hub
                        <br>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>