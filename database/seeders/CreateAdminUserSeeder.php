<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@fikri.com'],
            ['name' => 'Fikri', 'password' => bcrypt('12345678')]
        );

        $user2 = User::firstOrCreate(
            ['email' => 'sergio@fikri.com'],
            ['name' => 'sergio', 'password' => bcrypt('12345678')]
        );

        $role = Role::firstOrCreate(['name' => 'admin']);
        $role2 = Role::firstOrCreate(['name' => 'user']);
        
        $permissions = [
            'post-list',
            'post-create',
            'post-edit',
            'post-delete'
        ];
        
        $role2->syncPermissions($permissions);
        
        Category::firstOrCreate(['name' => 'Vue.js']);
        Category::firstOrCreate(['name' => 'Cat 2']);

        $permissions = Permission::pluck('id','id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
        $user2->assignRole([$role->id]);
    }
}