<?php

namespace app\models\user;

trait UserRoleManager
{
    private function assignRole($authManager, $roleName, $userId)
    {
        $authItem = $authManager->getRole($roleName);
        $authManager->assign($authItem, $userId);
    }

    private function updateRole($authManager, $roleName, $userId)
    {
        $authManager->revokeAll($userId);
        $this->assignRole($authManager, $roleName, $userId);
    }

    private function updatePermissions($authManager, $userId)
    {
        $existingPermissions = $authManager->getPermissionsByUser($userId);

        if ($this->role == AbstractUser::ROLE_STAFF) {
            foreach ($this->permissions as $permission) {
                $this->updatePermission($authManager, $existingPermissions, $userId, $permission['name'], $permission['checked']);
            }
        } else {
            $this->revokePermissions($authManager, $existingPermissions, $userId);
        }
    }

    private function updatePermission($authManager, &$existingPermissions, $userId, $permissionName, $isChecked)
    {
        if (isset($existingPermissions[$permissionName]) && !$isChecked) {
            $authManager->revoke($authManager->getPermission($permissionName), $userId);
        } elseif (!isset($existingPermissions[$permissionName]) && $isChecked) {
            $authManager->assign($authManager->getPermission($permissionName), $userId);
        }
    }

    private function revokePermissions($authManager, $existingPermissions, $userId)
    {
        foreach ($existingPermissions as $permission) {
            $authManager->revoke($authManager->getPermission($permission->name), $userId);
        }
    }
}