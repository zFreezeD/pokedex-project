let startPokeCount = 25;
let increasePokemon = 25;
let howManyPoke = 0;
let currentLanguage = "english";
let currentPokemon;
let currentSearchState = 'all';
let currentSearchType = "";
let globalStep = 0;
let currentSwitchState = 'attack';
let allPokeName = [];
let isSideMenuOpen = true;




async function start() {
    await GetAllPokeNames();
    ClearPokedex();
    SearchPokemon('all', false);

    const myDiv = document.getElementById('landing');
    myDiv.addEventListener('scroll', () => {
        if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
            LoadMoreButton();
        }
    })

    const searchInput = document.getElementById("search-type");

    searchInput.addEventListener('input', function (evt) {
        InputSearch(this.value);
    });
}


function LoadMoreButton() {
    if (currentSearchState == "input")
        return;
    SearchPokemon(currentSearchState, false);
}

function ChangeLanguage(current) {

    let german = document.getElementById("flag-german");
    let english = document.getElementById("flag-english");
    let search = document.getElementById("search-type");
    if (current == "english") {
        search.placeholder = "Pidgey...";
        currentLanguage = "english";
        german.classList.add("language-flag");
        german.classList.remove("language-flag-active");

        english.classList.remove("language-flag");
        english.classList.add("language-flag-active");

    } else if (current == "german") {
        search.placeholder = "Taubsi...";
        currentLanguage = "german";
        german.classList.remove("language-flag");
        german.classList.add("language-flag-active");

        english.classList.add("language-flag");
        english.classList.remove("language-flag-active");
    }
}

function ChangeSideMenu() {

    let header = document.getElementById("header");
    let logo = document.getElementById("header-logo");
    let search = document.getElementById("search-type");
    let typeArray = [];
    let allType = document.getElementById("side-type-all");
    let sideButton = document.getElementById("side-menu-button");

    for (let i = 0; i < 17; i++) {
        typeArray.push(document.getElementById(`side-type-${i}`));
    }

    if (isSideMenuOpen) {
        isSideMenuOpen = false;

        header.classList.remove("header");
        header.classList.add("header-closed");

        for (let i = 0; i < typeArray.length; i++) {
            typeArray[i].classList.add("header-type-main-closed");
            typeArray[i].classList.remove("header-type-main");
        }

        allType.classList.remove("header-type-all");
        allType.classList.add("header-type-all-closed");

        search.classList.add("display-none");

        logo.classList.remove("header-logo");
        logo.classList.add("header-logo-closed");

        sideButton.classList.remove("header-menu-open-container");
        sideButton.classList.add("header-menu-open-container-closed");

    } else {
        isSideMenuOpen = true;

        header.classList.remove("header-closed");
        header.classList.add("header");

        for (let i = 0; i < 17; i++) {
            typeArray[i].classList.remove("header-type-main-closed");
            typeArray[i].classList.add("header-type-main");
        }

        allType.classList.add("header-type-all");
        allType.classList.remove("header-type-all-closed");

        search.classList.remove("display-none");

        logo.classList.add("header-logo");
        logo.classList.remove("header-logo-closed");

        sideButton.classList.add("header-menu-open-container");
        sideButton.classList.remove("header-menu-open-container-closed");
    }
}

async function GetAllPokeNames() {
    let urlMain = `https://pokeapi.co/api/v2/pokemon/?limit=2000`;
    let pokemon = await fetch(urlMain);
    pokemon = await pokemon.json();
    pokemon = pokemon['results'];
    for (let i = 0; i < pokemon.length; i++) {
        allPokeName.push(pokemon[i]['name']);
    }

    /*for (let i = 0; i < pokemon.length; i++) {
        urlMain = pokemon[i]['url'];
        let pokemonGerman = await fetch(urlMain);
        pokemonGerman = await pokemonGerman.json();
        console.log(pokemonGerman);
        urlMain = pokemonGerman['species']['url'];
        pokemonGerman = await fetch(urlMain);
        pokemonGerman = await pokemonGerman.json();
        console.log(pokemonGerman['names']['5']['name']);
        allPokeNameGerman.push(pokemonGerman['names']['5']['name']);
    }*/

    /*for (let i = 0; i < allPokeNameGerman.length; i++) {
        allPokeNameGermanInt.push([1+i]);
        urlMain = pokemon[i]['url'];
        let pokemonGerman = await fetch(urlMain);
        pokemonGerman = await pokemonGerman.json();
        allPokeID.push(pokemonGerman['id']);
    }*/

}

function InputSearch(text) {

    if (text.length > 2) {
        globalStep++;
        howManyPoke = 0;
        ClearPokedex();
        currentSearchState = 'input';
        SearchPokemon(text, true);
    } else {
        globalStep++;
        howManyPoke = 0;
        ClearPokedex();
        currentSearchState = 'all';
        SearchPokemon("all", false);
    }
}

function ClearPokedex() {
    landing.innerHTML = `<div id="pop-up" class="pop-up-main display-none">
    <div id="pop-up-bg" onclick="ClosePopUp()" class="testBack">

    </div>
    <div class="pop-up-wrapper">
        <div id="pop-up-left" class="pop-up-left">
        </div>

        <div id="pop-up-right" class="pop-up-right">

        </div>
    </div>
</div>`;
}

function ClosePopUp() {
    let popUp = document.getElementById("pop-up");
    let landing = document.getElementById("landing");
    landing.style.overflowY = "auto";
    popUp.classList.add("display-none");
}

function SearchType(type) {
    ClosePopUp();
    globalStep++;
    howManyPoke = 0;
    ClearPokedex();
    document.getElementById("search-type").value = "";
    currentSearchType = type;
    if (type == "all")
        currentSearchState = 'all'
    else
        currentSearchState = 'type';
    SearchPokemon(currentSearchState, false);
}

async function SearchPokemon(state, isInput) {

    console.log(state, isInput);

    let currentStep = globalStep;
    state = state.toLowerCase();

    let loadBtn = document.getElementById('loadButton');
    loadBtn.classList.add('display-none');



    if (isInput == true) {
        let searchArray = [];
        if (currentLanguage == "english") {
            for (let i = 0; i < allPokeName.length; i++) {
                let currentName = allPokeName[i];
                if (currentName.includes(state))
                    searchArray.push(allPokeName[i]);
            }
        } else if (currentLanguage == "german") {
            for (let i = 0; i < allPokeNameGerman.length; i++) {
                let currentName = allPokeNameGerman[i];

                if (currentName.includes(state)) {
                    searchArray.push(allPokeID[i]);
                }
            }
        }

        howManyPoke = searchArray.length;
        if (currentLanguage == "english") {
            for (let i = 0; i < searchArray.length; i++) {
                let currentPokemon = await GetPokeArrayByName(searchArray[i]);
                AddToPokedex(currentPokemon, currentStep);
            }
        }

        if (currentLanguage == "german") {
            for (let i = 0; i < searchArray.length; i++) {
                let currentPokemon = await GetPokeArrayByNumber(searchArray[i]);
                AddToPokedex(currentPokemon, currentStep);
            }
        }

    } else {

        for (let i = 0; i < increasePokemon; i++) {
            let current = howManyPoke;

            if (currentSearchState == "all") {
                currentPokemon = await GetPokeArrayByNumber(current + 1);
            } else {
                currentPokemon = await GetPokeArrayByType(currentSearchType);
                let check = howManyPoke;

                if (check >= currentPokemon['pokemon'].length) {
                    return;
                }
                currentPokemon = await GetPokeByTypeArray(currentPokemon, current);
                //console.log(currentPokemon = currentPokemon['pokemon'][current]['pokemon']['url']);;f
            }

            AddToPokedex(currentPokemon, currentStep);
            howManyPoke++;

        }



        let loadBtn = document.getElementById('loadButton');
        loadBtn.classList.remove('display-none');
    }

}

function AddToPokedex(currentPokemon, currentStep) {
    if (globalStep != currentStep)
        return;

    let pokeImage = GetPokeImage(currentPokemon);
    if (pokeImage == null) {
        howManyPoke++;
        return;
    }

    let pokeName = GetPokeName(currentPokemon);
    let pokeTypes = GetPokeType(currentPokemon);
    let pokeID = GetPokeID(currentPokemon);
    let normalID = currentPokemon['id'];

    //RenderPokemonInfo(i);

    //debugConsole(currentPokemon, pokeImage, pokeName, pokeTypes);
    if (globalStep != currentStep)
        return;

    CreatePokedex(pokeName, pokeImage, pokeTypes, pokeID, normalID);
}

async function GetPokeByTypeArray(typeArray, number) {
    let urlMain = typeArray['pokemon'][number]['pokemon']['url'];
    pokemon = await fetch(urlMain);
    return pokemon = await pokemon.json();
}

async function GetPokeArrayByType(type) {
    let urlMain = `https://pokeapi.co/api/v2/type/${type}`;
    pokemon = await fetch(urlMain);
    return pokemon = await pokemon.json();
}


async function GetPokeArrayByName(searchName) {
    let urlMain = `https://pokeapi.co/api/v2/pokemon/${searchName}`;
    let pokemon = await fetch(urlMain);
    return pokemon = await pokemon.json();
}

async function GetPokeArrayByNumber(number) {
    let urlMain = `https://pokeapi.co/api/v2/pokemon/${number}`;
    let pokemon = await fetch(urlMain);
    return pokemon = await pokemon.json();
}

function GetPokeID(pokemon) {
    let pokeID = pokemon['id'].toString();

    let digitTest = pokeID.length;
    if (digitTest == 1)
        pokeID = "00" + pokeID;
    if (digitTest == 2)
        pokeID = "0" + pokeID;

    return pokeID;
}

function GetPokeName(pokemon) {
    let pname = pokemon['name'];
    return pname = pname.toUpperCase();
}

function GetPokeImage(pokemon) {
    let pokeImage = pokemon['sprites']['other']['dream_world']['front_default'];
    if (pokeImage == null)
        return pokeImage = pokemon['sprites']['front_default'];
    if (pokeImage == null)
        return pokeImage = pokemon['sprites']['other']['official-artwork']['front_default'];
    if (pokeImage == null) {
        return null;
    }

    return pokeImage;
}

function GetPokeType(pokemon) {
    return pTypes = pokemon['types'];
}


function debugConsole(currentPokemon, pokeImage, pokeName, pokeTypes) {
    console.log(currentPokemon);
    console.log(pokeImage);
    console.log(pokeName);
    console.log(pokeTypes);
}


function GetTypeColor(type, isBrighter) {
    if (isBrighter == false) {
        var col = "--t" + type['type']['name'];
        return col;
    } else {
        var col = "--t" + type['type']['name'] + "-brighter";
        return col;
    }
}


function CreatePokedex(pokeName, pokeImage, pokeTypes, pokeID, normalID) {

    var newVar = '';
    for (let i = 0; i < pokeTypes.length; i++) {
        var type = GetTypeColor(pokeTypes[i], false);
        var newVar = newVar + `<div class="card-right-type-container">
            <img src="./img/types-colored/${pokeTypes[i]['type']['name']}.svg">
                <p style="color: var(${type});">${pokeTypes[i]['type']['name'].toUpperCase()}</p>
                </div>`;
    }

    let mainColor = GetTypeColor(pokeTypes[0], false)
    let brightColor = GetTypeColor(pokeTypes[0], true)

    landing.innerHTML +=
        `<div onclick="CreatePopUp(${normalID})" class="card-main" style="background: linear-gradient(0deg, var(${mainColor}) 0%, var(${brightColor}) 100%);">
        <div class="card-left">
            <img src="${pokeImage}">
        </div>
        <div class="card-right">
            <div class="card-right-name-container">
                <p>${pokeName}</p>
            </div>
            <div class="card-right-type-main">
                ${newVar}
            </div>
            <div class="card-right-number-container">
                <p>#${pokeID}</p>
            </div>
        </div>
    </div>`
}


async function CreatePopUp(link) {
    let landing = document.getElementById("landing");
    landing.style.overflowY = "hidden";
    let popUpPokemon = await GetPokeArrayByNumber(link);
    let pokeNumber = await GetPokeID(popUpPokemon);
    let pokeImage = await GetPokeImage(popUpPokemon);
    let pokeName = await GetPokeName(popUpPokemon);
    let pokeType = await GetPokeType(popUpPokemon);
    let pokeInfo = await GetPokeInformation(popUpPokemon);
    let HeightWeightArray = await GetPokeHeightWeightArray(popUpPokemon);
    let statList = await GetPokeStatArray(popUpPokemon);
    let pokeID = popUpPokemon['id'];

    let leftPopUp = document.getElementById('pop-up-left');
    let rightPopUp = document.getElementById('pop-up-right');

    let pokeColor = `var(--t${pokeType[0]['type']['name']})`;
    let pokeColorHalf = `var(--t${pokeType[0]['type']['name']}half)`;

    let imageSection = CreatePopUpImageSection(pokeNumber, pokeImage, pokeName);
    let typeSection = CreatePopUpTypeSection(pokeType, pokeColor);
    let characteristicSection = CreatePopUpCharacteristicSection(HeightWeightArray, pokeColor);
    let PopUpStatSection = CreatePopUpStatsSection(statList, pokeColor)
    let PopUpInformationSection = CreatePopUpInformationSection(pokeInfo, pokeColor);
    let PopUpEffectiveSection = await CreatePopUpEffectiveSection(pokeID, pokeColor, pokeColorHalf);

    leftPopUp.innerHTML = imageSection + typeSection + characteristicSection + PopUpStatSection;
    rightPopUp.innerHTML = PopUpInformationSection + PopUpEffectiveSection;

    FillEffectiveSection(popUpPokemon, pokeName, pokeColor);

    let popUpBg = document.getElementById("pop-up-bg")
    popUpBg.style.backgroundColor = `var(--t${pokeType[0]['type']['name']}half)`
    let popUp = document.getElementById("pop-up");
    popUp.classList.remove("display-none");
}

async function GetPokeInformation(pokemon) {
    let urlMain = pokemon['species']['url'];
    pokemon = await fetch(urlMain);
    pokemon = await pokemon.json();
    let info = pokemon['flavor_text_entries'];
    for (let i = 0; i < info.length; i++) {
        let currentLang = info[i]['language']['name'];
        if (currentLang == "en"); {
            return info[i]['flavor_text'];
        }
    }

    return pokemon['flavor_text_entries'][0]['flavor_text'];
}

function GetPokeHeightWeightArray(pokemon) {
    pHeightWeightArray = [];
    pHeightWeightArray.push((pokemon['weight'] / 10).toFixed(2));
    pHeightWeightArray.push((pHeightWeightArray[0] * 2.205).toFixed(2));
    pHeightWeightArray.push((pokemon['height'] / 10).toFixed(2));
    pHeightWeightArray.push((pHeightWeightArray[2] * 32.808).toFixed(2));

    return pHeightWeightArray;

}

function GetPokeStatArray(pokemon) {
    pStatsArray = [];
    pStatsTest = [];
    for (let i = 0; i < 6; i++) {
        pStatsArray.push(pokemon['stats'][i]['base_stat']);
        pStatsTest.push(pokemon['stats'][i]['stat']['name']);
    }
    return pStatsArray;

}


function CreatePopUpImageSection(pokeNumber, pokeImage, pokeName) {
    return section = `<div class="pop-up-container">
                        <div onclick="ClosePopUp()" class="pop-up-container-pokeimage-closer">
                        <img src="./img/icons/cross.png">
                        </div>
                        <div class="pop-up-container-pokeimage-pokedex">
                            <p>#${pokeNumber}</p>
                        </div>
                        <div class="pop-up-container-pokeimage">
                            <img src="${pokeImage}">
                            <h3>${pokeName}</h3>
                        </div>
                    </div>`
}

function CreateTypes(pokeType) {
    let typeArray = [];
    for (let i = 0; i < pokeType.length; i++) {
        var type = GetTypeColor(pokeType[i], false)
        typeArray.push(`<div class="pop-up-type-main" style="background-color: var(${type}half)">
            <img src="./img/types/${pokeType[i]['type']['name']}.png">
            <p class="pop-up-type-text">${pokeType[i]['type']['name'].toUpperCase()}</p>
        </div>`);
    }
    return typeArray.join('');
}


function CreatePopUpTypeSection(pokeType, pokeColor) {
    return section = `<div class="pop-up-container">
    <div style="border-color: ${pokeColor};" class="pop-up-container-headline">
        <h3>Types</h3>
    </div>
    <div class="pop-up-container-content-type-content pop-up-container-padding">
        ${CreateTypes(pokeType)}
    </div>
</div>`
}

function CreatePopUpCharacteristicSection(HeightWeightArray, pokeColor) {
    return section = `<div class="pop-up-container">
    <div style="border-color: ${pokeColor};" class="pop-up-container-headline">
        <h3>Characteristic</h3>
    </div>
    <div class="pop-up-container-content pop-up-container-padding">
        <div class="pop-up-container-content-characteristic-content">
            <p>Height:</p>
            <p>${(HeightWeightArray[2])}m</p>
            <p>${HeightWeightArray[3]}ft</p>
        </div>
        <div class="pop-up-container-content-characteristic-content">
            <p>Weight:</p>
            <p>${HeightWeightArray[0]}kg</p>
            <p>${HeightWeightArray[1]}lbs</p>
        </div>
    </div>
</div>`
}


function CalcPercentStat(stat) {
    return percent = (100 / 255) * stat;
}

function CreatePopUpStatsSection(statList, pokeColor) {
    return section = `<div class="pop-up-container">
    <div style="border-color: ${pokeColor};" class="pop-up-container-headline">
        <h3>Base Stats</h3>
    </div>

    <div class="pop-up-container-content-stats-content pop-up-container-padding">

        <div class="pop-up-stats-content">
            <p class="pop-up-stats-headline">HP:</p>
            <div style="background-color: rgba(255, 0, 0, 0.3);" class="pop-up-stats-bar-main">
                <div style="width: ${CalcPercentStat(statList[0])}%; background-color: rgb(255, 0, 0);" class="pop-up-stats-bar-bg">
                    <p>${statList[0]}</p>
                </div>
            </div>
        </div>
        <div class="pop-up-stats-content">
            <p class="pop-up-stats-headline">ATTACK:</p>
            <div style="background-color: rgba(228, 143, 14, 0.3);" class="pop-up-stats-bar-main">
                <div style="width: ${CalcPercentStat(statList[1])}%; background-color: rgb(228, 143, 14);" class="pop-up-stats-bar-bg">
                    <p>${statList[1]}</p>
                </div>
            </div>
        </div>
        <div class="pop-up-stats-content">
            <p class="pop-up-stats-headline">DEFENSE:</p>
            <div style="background-color: rgba(0, 26, 255, 0.3);" class="pop-up-stats-bar-main">
                <div style=" width: ${CalcPercentStat(statList[2])}%; background-color: rgb(0, 26, 255);" class="pop-up-stats-bar-bg">
                    <p>${statList[2]}</p>
                </div>
            </div>
        </div>
        <div class="pop-up-stats-content">
            <p class="pop-up-stats-headline">SP. ATK:</p>
            <div style="background-color: rgba(217, 173, 103, 0.3);" class="pop-up-stats-bar-main">
                <div style="width: ${CalcPercentStat(statList[3])}%; background-color: rgb(217, 173, 103);" class="pop-up-stats-bar-bg">
                    <p>${statList[3]}</p>
                </div>
            </div>
        </div>
        <div class="pop-up-stats-content">
            <p class="pop-up-stats-headline">SP. DEF:</p>
            <div style="background-color: rgba(124, 137, 255, 0.3);" class="pop-up-stats-bar-main">
                <div style="width: ${CalcPercentStat(statList[4])}%; background-color: rgb(124, 137, 255);" class="pop-up-stats-bar-bg">
                    <p>${statList[4]}</p>
                </div>
            </div>
        </div>
        <div class="pop-up-stats-content">
            <p class="pop-up-stats-headline">SPEED:</p>
            <div style="background-color: rgba(128, 11, 183, 0.3);" class="pop-up-stats-bar-main">
                <div style="width: ${CalcPercentStat(statList[5])}%; background-color: rgb(128, 11, 183);" class="pop-up-stats-bar-bg">
                    <p>${statList[5]}</p>
                </div>
            </div>
        </div>

    </div>

</div>

</div>`
}

function CreatePopUpInformationSection(ptext, pokeColor) {
    return section = `<div class="pop-up-container">
    <div style="border-color: ${pokeColor};" class="pop-up-container-headline">
        <h3>Information</h3>
    </div>
    <div class="pop-up-container-content pop-up-container-padding">
        <p>${ptext}.</p>
    </div>
</div>`
}

async function FillEffectiveSection(pokemon, pokeName, pokeColor) {

    let urlArray = [];
    let pokeTypes = pokemon['types'];

    for (let i = 0; i < pokeTypes.length; i++) {
        urlArray.push(pokeTypes[i]['type']['url']);
    }
    let typeArray = []

    for (let i = 0; i < urlArray.length; i++) {
        let currentURL = await fetch(urlArray[i]);
        currentURL = await currentURL.json();
        typeArray.push(currentURL['damage_relations']);
    }


    let allTypesURL = await fetch(`https://pokeapi.co/api/v2/type`);
    allTypesURL = await allTypesURL.json();
    allTypesURL = allTypesURL['results'];
    let allTypesArray = [];

    for (let i = 0; i < allTypesURL.length; i++) {
        allTypesArray.push(allTypesURL[i]['name']);
    }

    allTypesArray = allTypesArray.filter(e => e !== 'shadow');
    allTypesArray = allTypesArray.filter(e => e !== 'unknown');

    let attackNames = [
        'double_damage_to',
        'no_damage_to',
        'half_damage_to'
    ]

    let defenseNames = [
        'double_damage_from',
        'no_damage_from',
        'half_damage_from'
    ]
    let switchArray = [];
    if (currentSwitchState == "attack")
        switchArray = attackNames;
    else
        switchArray = defenseNames;

    let nameArray = [];
    let numberArray = [];

    for (let i = 0; i < typeArray.length; i++) {
        let attackEvenArray = allTypesArray;
        for (let x = 0; x < typeArray[i][`${switchArray[0]}`].length; x++) {
            let tName = typeArray[i][`${switchArray[0]}`][x]['name'];
            nameArray.push(tName);

            numberArray.push(2);


            if (attackEvenArray.includes(tName)) {
                attackEvenArray = attackEvenArray.filter(e => e !== tName);
            }
        }
        for (let x = 0; x < typeArray[i][`${switchArray[1]}`].length; x++) {
            let tName = typeArray[i][`${switchArray[1]}`][x]['name'];
            nameArray.push(tName);
            numberArray.push(0);

            if (attackEvenArray.includes(tName)) {
                attackEvenArray = attackEvenArray.filter(e => e !== tName);
            }
        }
        for (let x = 0; x < typeArray[i][`${switchArray[2]}`].length; x++) {
            let tName = typeArray[i][`${switchArray[2]}`][x]['name'];
            nameArray.push(tName);

            numberArray.push(0.5);

            if (attackEvenArray.includes(tName)) {
                attackEvenArray = attackEvenArray.filter(e => e !== tName);
            }
        }


        for (let i = 0; i < attackEvenArray.length; i++) {
            nameArray.push(attackEvenArray[i]);
            numberArray.push(1);
        }
    }





    let fixedNameArray = [];
    let fixedNumberArray = [];

    for (let i = 0; i < nameArray.length; i++) {

        if (fixedNameArray.includes(nameArray[i])) {
            let exist = fixedNameArray.indexOf(nameArray[i]);
            fixedNumberArray[exist] = fixedNumberArray[exist] * numberArray[i];
        } else {
            fixedNameArray.push(nameArray[i]);
            fixedNumberArray.push(numberArray[i]);
        }
    }

    let effectiveSection = [];
    let evenSection = [];
    let immuneSection = [];
    let weakSection = []

    let tptext = "";



    for (let i = 0; i < fixedNumberArray.length; i++) {

        if (currentSwitchState == "attack") {
            tptext = `${pokeName} dealing ${fixedNumberArray[i]}x damage to ${fixedNameArray[i]}`;
        } else {
            tptext = `${pokeName} getting ${fixedNumberArray[i]}x damage by ${fixedNameArray[i]}`;
        }

        let section = `<div class="effective-type-main" style="background-color: var(--t${fixedNameArray[i]}half)">
        <span style="background-color: ${pokeColor};" class="tooltiptext">${tptext}</span>
            <img src="./img/types/${fixedNameArray[i]}.png">
                <p class="pop-up-type-text">${fixedNameArray[i].toUpperCase()}</p>
                <div class="effective-type-bonus-wrapper">
                    <div class="effective-type-bonus">
                        <p>${fixedNumberArray[i]}x</p>
                    </div>
                </div>
        </div>`

        if (fixedNumberArray[i] >= 2)
            weakSection.push(section);
        else if (fixedNumberArray[i] == 1)
            evenSection.push(section);
        else if (fixedNumberArray[i] <= 0.5 && fixedNumberArray[i] > 0.1)
            effectiveSection.push(section);
        else if (fixedNumberArray[i] == 0)
            immuneSection.push(section);
        else
            console.log("ERROR " + fixedNumberArray[i]);

    }
    let fillerTpText = `${pokeName} has none in this category`;

    let filler = `<div class="effective-type-main" style="background-color: var(--col2)">
    <span style="background-color: var(--col2);" class="tooltiptext">${fillerTpText}</span>
        <img class="effective-type-image-fix" src="./img/icons/cross.png">
            <p class="pop-up-type-text">Nothing</p>
            <div class="effective-type-bonus-wrapper">
                <div class="effective-type-bonus">
                    <p>0x</p>
                </div>
            </div>
    </div>`


    if (effectiveSection.length == 0) {
        effectiveSection.push(filler)
    }
    if (evenSection.length == 0) {
        evenSection.push(filler)
    }
    if (immuneSection.length == 0) {
        immuneSection.push(filler)
    }
    if (weakSection.length == 0) {
        weakSection.push(filler)
    }

    if (currentSwitchState == "defense") {
        document.getElementById('effective-landing').innerHTML = `${effectiveSection.join('')}`;
        document.getElementById('even-landing').innerHTML = `${evenSection.join('')}`;
        document.getElementById('immune-landing').innerHTML = `${immuneSection.join('')}`;
        document.getElementById('weak-landing').innerHTML = ` ${weakSection.join('')}`;
    } else {
        document.getElementById('weak-landing').innerHTML = `${effectiveSection.join('')}`;
        document.getElementById('even-landing').innerHTML = `${evenSection.join('')}`;
        document.getElementById('immune-landing').innerHTML = `${immuneSection.join('')}`;
        document.getElementById('effective-landing').innerHTML = ` ${weakSection.join('')}`;
    }
}

async function ChangeEffectiveSwitch(pokeID, pokeColor, pokeColorHalf, newSwitchState) {

    if (newSwitchState == currentSwitchState)
        return;

    currentSwitchState = newSwitchState;

    let attackSwitch = document.getElementById('attack-switch');
    let defenseSwitch = document.getElementById('defense-switch');
    let icon = document.getElementById('switch-image');

    if (newSwitchState == "attack") {
        icon.src = "/img/icons/attack.png";
        attackSwitch.style.backgroundColor = `${pokeColorHalf}`;
        defenseSwitch.style.backgroundColor = `${pokeColor}`;
    } else {
        icon.src = "/img/icons/defense.png";
        attackSwitch.style.backgroundColor = `${pokeColor}`;
        defenseSwitch.style.backgroundColor = `${pokeColorHalf}`;
    }

    let pokemon = await GetPokeArrayByNumber(pokeID);
    let pokeName = pokemon['name'].toUpperCase();
    FillEffectiveSection(pokemon, pokeName, pokeColor);
}

async function CreatePopUpEffectiveSection(pokeID, pokeColor, pokeColorHalf) {

    if (currentSwitchState == "attack") {
        return section = `<div class="pop-up-container">
    <div style="border-color: ${pokeColor};" class="pop-up-container-headline">
        <h3>Effective Chart</h3>
        <div style="margin-top: 20px"></div>

        <div style="border-color: ${pokeColor};" class="pop-up-effective-switch">
            <div id="attack-switch" onclick="ChangeEffectiveSwitch(${pokeID}, '${pokeColor}', '${pokeColorHalf}', 'attack')" class="pop-up-effective-btn" style="background-color: ${pokeColorHalf};"><img src="./img/icons/attack.png"></div>
            <div id="defense-switch" onclick="ChangeEffectiveSwitch(${pokeID}, '${pokeColor}', '${pokeColorHalf}', 'defense')"class="pop-up-effective-btn" style="background-color: ${pokeColor};"><img src="./img/icons/defense.png"></div>
        </div>
    </div>

    <div class="pop-up-container-content-effective-container pop-up-container-padding">

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img id="switch-image" src="./img/icons/attack.png"></div>
            </div>

            <div id="effective-landing" class="pop-up-container-content-effective-container-list">
                

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img src="./img/icons/equal.png"></div>
            </div>

            <div id="even-landing" class="pop-up-container-content-effective-container-list">

            

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img src="./img/icons/immune.png"></div>
            </div>

            <div id="immune-landing" class="pop-up-container-content-effective-container-list">

            

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img src="./img/icons/weak.png"></div>
            </div>

            <div id="weak-landing" class="pop-up-container-content-effective-container-list">

            

            </div>
        </div>
    </div>
</div>`
    }
    else {
        return section = `<div class="pop-up-container">
    <div style="border-color: ${pokeColor};" class="pop-up-container-headline">
        <h3>Effective Chart</h3>
        <div style="margin-top: 20px"></div>

        <div style="border-color: ${pokeColor};" class="pop-up-effective-switch">
            <div id="attack-switch" onclick="ChangeEffectiveSwitch(${pokeID}, '${pokeColor}', '${pokeColor}', 'attack')" class="pop-up-effective-btn" style="background-color: ${pokeColor};"><img src="./img/icons/attack.png"></div>
            <div id="defense-switch" onclick="ChangeEffectiveSwitch(${pokeID}, '${pokeColor}', '${pokeColorHalf}', 'defense')"class="pop-up-effective-btn" style="background-color: ${pokeColorHalf};"><img src="./img/icons/defense.png"></div>
        </div>
    </div>

    <div class="pop-up-container-content-effective-container pop-up-container-padding">

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img id="switch-image" src="./img/icons/defense.png"></div>
            </div>

            <div id="effective-landing" class="pop-up-container-content-effective-container-list">
                

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img src="./img/icons/equal.png"></div>
            </div>

            <div id="even-landing" class="pop-up-container-content-effective-container-list">

            

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img src="./img/icons/immune.png"></div>
            </div>

            <div id="immune-landing" class="pop-up-container-content-effective-container-list">

            

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div class="margin-10"><img src="./img/icons/weak.png"></div>
            </div>

            <div id="weak-landing" class="pop-up-container-content-effective-container-list">

            

            </div>
        </div>
    </div>
</div>`

    }
}


/* <div class="pop-up-container">
    <div class="pop-up-container-headline">
        <h3>Effective Chart</h3>
        <div style="margin-top: 20px"></div>

        <div class="pop-up-effective-switch">
            <div class="pop-up-effective-btn"><img src="./img/icons/attack.png"></div>
            <div class="pop-up-effective-btn" style="background-color: var(--tgrasshalf);"><img src="./img/icons/defense.png"></div>
        </div>
    </div>

    <div class="pop-up-container-content-effective-container pop-up-container-padding">

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div><img src="./img/icons/strong.png"></div>
            </div>

            <div class="pop-up-container-content-effective-container-list">

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div><img src="./img/icons/equal.png"></div>
            </div>

            <div class="pop-up-container-content-effective-container-list">

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div><img src="./img/icons/immune.png"></div>
            </div>

            <div class="pop-up-container-content-effective-container-list">

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="pop-up-container-content-effective-container-main">
            <div>
                <div><img src="./img/icons/weak.png"></div>
            </div>

            <div class="pop-up-container-content-effective-container-list">

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

                <div class="effective-type-main" style="background-color: var(--tghosthalf)">
                    <img src="./img/types/Ghost.png">
                    <p>GHOST</p>
                    <div class="effective-type-bonus-wrapper">
                        <div class="effective-type-bonus">
                            <p>2x</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>` */
