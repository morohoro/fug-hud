local Config = require('config')

RegisterNetEvent('qb-hud:requestPlayerData')
AddEventHandler('qb-hud:requestPlayerData', function(source)
    local src = source
    local user_id = GetPlayerServerId(source)

    -- Get player data using QBCore functions or other methods
    local playerData = QBCore.Functions.GetPlayerData(user_id)

    -- Enhance player data structure with additional information
    playerData.weaponAmmo = GetAmmoInClip(GetSelectedPedWeapon(GetPlayerPed(src))) -- Example
    playerData.vehicle = GetVehiclePedIsIn(GetPlayerPed(src), false) -- Example

    -- Apply config values to player data (if needed)
    playerData.drawDistance = Config.DrawDistance

    TriggerClientEvent('qb-hud:updatePlayerData', src, playerData)
end)

-- Example of updating player data based on an event
RegisterNetEvent('playerDamaged')
AddEventHandler('playerDamaged', function(source, damage, attacker)
    local playerId = GetPlayerServerId(source)
    PlayerData[playerId].health = GetEntityHealth(GetPlayerPed(source))
    TriggerClientEvent('qb-hud:updatePlayerData', source, PlayerData[playerId])
end)

local PlayerData = {}

function GetPlayerData(source)
    local playerId = GetPlayerServerId(source)
    if not PlayerData[playerId] then
        PlayerData[playerId] = {
            health = Config.DefaultHealth,
            armor = Config.DefaultArmor,
            hunger = Config.DefaultHunger,
            thirst = Config.DefaultThirst,
            oxygen = Config.DefaultOxygen,
            money = {
                cash = Config.DefaultCash,
                bank = Config.DefaultBank
            },
            weapon = {
                name = "unarmed",
                ammo = 0
            },
            vehicle = {
                model = nil,
                health = Config.DefaultVehicleHealth,
                fuel = Config.DefaultFuel,
                speed = 0
            },
            voiceRange = Config.DefaultVoiceRange,
            stress = Config.DefaultStress,
            isArmed = false,
            isParachuting = false,
            coordinates = {
                x = 0,
                y = 0,
                z = 0
            },
            heading = 0
        }
    end

    -- Update player data with real-time values (e.g., from QBCore)
    PlayerData[playerId].health = GetEntityHealth(GetPlayerPed(source))
    -- ... other data updates

    return PlayerData[playerId]
end