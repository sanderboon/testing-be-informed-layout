# Changelog

All notable changes to this project will be documented in this file.
See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 20.2.0 (2020-10-23)

### Features

- **list-detail**
  - encode id's of list items because they can contain reserved uri characters ([52c743](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/52c74332afc7712caf1a4de83917ff951b83e129), [70aec6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/70aec6bdffe64ee87f3a0a2d6a6baf6b64f97577))
- **datetime**
  - date time input width in rems ([785d8c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/785d8c876f1fb67d372782733957109ff3913c4f))
  - readonly date formatting based on setting if using product default date format ([09ec6b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/09ec6b743c28531457f9ec0960c303af14afb00b))
  - added datetime and timestamp format constraint ([e7e1cb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e7e1cb59783c3e25cb3b8b77f0d6d0a2bcdf907c))
  - range attribute with styled duration ([571115](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/57111594684b277dcaa18c330187abf19909293d))
  - datetime input for general layout ([84c56d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/84c56d788ba4e8c39c8931eedefa68669e955369))
  - remove ms from date time format in preparation for new datetime attribute ([85ed71](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/85ed7114f0f79d6b2db69e4dc9be05ad647c6513))
- **tooltip**
  - addded placement based on position prop ([5e9559](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5e955948e698eacb67770bf98edb40862228f852))
  - let tooltip use popper to fix problems with overflow ([cf65eb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cf65eb205fc3a1d2f47f1dcac14acc85c46bde00))
  - allow for bottom and top positioning of tooltip ([a53dc4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a53dc45705c35d9fb288434fa638d851eabe5d6e), [84b2a4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/84b2a4fe74c194945c1ba30c3cd143eba4fc21d7))
- **list sorting**
  - replaced sort icon with custom svg for more clear sorting indication ([077115](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/07711532caed0ed4c525e00e394bcf3ea9824b13))
  - remove column sorting indicator on table head ([5d4313](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5d431367bc58a7bc00fee6359dcb39a7863662e7))
  - table view list sorting via table header ([6ec008](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6ec00862aedbc0f3777a9796ee8987408c7d04f6))
- **table-sorting**
  - move sorting part to head cells for consistent sorting on different table views ([b950d5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b950d528fa0fb00b2f1aa960ad2c45b7525c5a55), [dd2e47](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dd2e4749b535cc04953e576e0304431824060da1))
- **inline-edit**
  - move create button outside table for better styling ([741028](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7410283a77ff76c10a9505a71ef66dc09e4e162f), [4dec31](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4dec31aae36c0ec765589aac8a678a1a1f8a8ff0), [706c9e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/706c9e018ff58894fddec2b7496b999d78594a33))
  - let inline edit tables accept range attributes ([dd60fa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dd60fa52fe728aae8c2928c63e78ec00d82bebab), [2332ff](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2332ff4d249106ffaa352ce98efc18b104f2cd2e))
  - update rendering of boolean attributes on inline edit ([3230c8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3230c860c920f946232251441d1200e3acd5cb3a))
  - rewrite EditTableRow(s) and move components to individual folders ([0cc9ce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0cc9ce832dadd1fee0001004e97187c3e2f542ac), [706cfc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/706cfc8781877e140f281adfad4888034aacdede))
- **noscript**
  - update rendering of noscript tag ([45eaec](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/45eaec67af8b4666fbb258c7b119c2a5dc758502))
- **list detail**
  - added ability to control exact matching on list detail route ([a6d46b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a6d46b4c528c1c21eee2e013260871cbc35f0ec0))
- **tables**
  - remove overflow hidden and keep sorting icon on one line in header ([8e44ed](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8e44edd41135077999692e0aada422c309b81f63), [bdb42a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bdb42a97a861cbd4964f19112f2e62ce6dcd2d3e))
  - add TABLE_ROW and TABLE_ROW_ALT as themeable background properties ([f62b8d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f62b8d847ece99defd0cdd6d57af8ac33cd2f70a))
- **list-sorting**
  - update rendering of sort icon and inline edit headers ([624a56](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/624a56f960cae5545e487ce8b21745cb60c72cbd), [834608](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/834608a3f0a23f6d7f317eb25692b8a4e385107d), [ab9682](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ab9682b2bdc4600f6bf52d452c93c174dc7a4158), [f7afc7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f7afc796d1c7effe17ee8c39a105914fcc957a9a))
- **react-router-link**
  - allow data attributes ([1a0176](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1a0176a56441f2bdd20bee2d2feee2ad0fcba8f8))
  - allow a filtered list of attributes on react-router link ([8fb5aa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8fb5aabaf6e3e9974110b0b118396114cda345d4))
- **translate**
  - make it possible to retrieve a translate method via a hook ([cc64e6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cc64e6fccef474e419144d69deb578a98890a6b8))
- **icon**
  - make it possible to add aria and title to icons ([b7c5e2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b7c5e2f911d847fbabd7d6b8363f27c8452c41b6))
- **input**
  - move formatting of input values on blur to the string attribute, format iban and postcode ([c75472](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c75472c14ea85cc41a79f3e02015e0b60dac0cc1), [65ade4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/65ade414731064f311675d0a80876764beb172fe))
- **favicon**
  - update favicon without background ([812dbe](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/812dbeced642658d61b31c890b4b9f887af63d2f))
  - updated favicon icons and logo with new versions. ([255887](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2558872fa2209e0d221bb93c6e2ab4e4dfca81c3))
- **polyfill**
  - add polyfill for Element#closest to support ie11 ([96b52f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/96b52fc31cc16a03314e8a1548abde6b0e7b1090))
- **bsn**
  - update rendering and formatting of bsn numbers ([2983c1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2983c1f2bd2addc99c3285a13970892673ab4457))
- **errors**
  - make it possible to render errors after requesting panels ([2a17e2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2a17e2a64f968e6a1f46405cfd9dfffc0052edd7), [66f1cd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/66f1cdcd4539d1f6888ac7f0c4c0c0ca21ea5733))
- **forms**
  - handle not authorized forms under task groups - [BISU-6523](https://support.beinformed.com/browse/BISU-6523) ([31bc44](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/31bc44a309c18b9e2851b3c1d60ab7164e0f2a0d), [66aec9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/66aec993375469d042b6664c5e5ee04d90f24d61))
- **hmr**
  - replace hmr with react fast-refresh and webpack-dev server with webpack-plugin-serve ([dfb76c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dfb76c612074ca1af3136d03f625cb6af9504529), [95cf0e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/95cf0e98854715b3e6fe8dca9ecce7ba130dd096))
- **form**
  - make it possible to skip merging of previously entered form objects - [BISU-6570](https://support.beinformed.com/browse/BISU-6570) ([721912](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/721912b18d12486acfedbb39066539c3baf397e8), [5423be](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5423be5b7dc0cebfc59c3a454d3e7a0f5bc98cac), [b39078](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b3907897dcb42ae9cdc6a9a7e8e548643aacbdd1), [e50d16](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e50d16fcef985df6f38266cd7ada5c297c7c3d9e))
- **bisc-4242**
  - make DetailModel applicable for list panels marked as DetailPanel ([fe184a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fe184a9925bb889ab369936d7f89ce958d3aba41), [a3dfc8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a3dfc881e87a759897b6227e83f26ac3b21fe32f))
  - make DetailModel applicable for service list panels ([5d3c27](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5d3c27bba2724ea092b88ff78355589611240866), [4999bd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4999bd33e1d35c38fba45998d9a50f5e624d3cc2))
- **timestamp**
  - replace icon popover with tooltip for duration on timestamp range attribute ([2930d8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2930d8c77849aa88e0f6e37f3f22c685487e0c7b))
  - duration for timestamp range attributes in icon with popover ([3799d9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3799d96aae4651060e3683698b16beb75b565e6d))
- **npm**
  - replace usage of yarn with npm, no longer recommend yarn ([086528](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0865280179165c89a389737a09bcf15c4f2c23a5), [051d52](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/051d524aca1c622c880a4c9bedb64bc387d5a6cd))
- **date-time**
  - update time of initial value based on availability of H / m / s in format of attribute ([95a0ca](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/95a0ca23a938cf4e910e2a4ae15ee50c8abf8f97), [ba8831](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ba8831e5aac0f566ac86579a7b533d509e0f4684), [cf5b55](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cf5b558739209fb13ebb3df6f3144845da7adec4))
- **date-range**
  - add duration data-attribute on wrapper of range attribute ([1a8098](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1a80989f961a20a47ff3e257684af49b01580a32))
- **filter-button**
  - disable filter button when filter is not valid ([f080d3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f080d3683fbe1f6bc3280c6e98350fd4cb6bcb63))
- **error-handling**
  - move unauthorized error handling to separate action ([1596f3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1596f38b8582d8b09612934c3b039de1817e0f3d))
  - add response to UnauthorizedException ([3aa86c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3aa86c1a6410305c8ddeebb2f518466b3341a5e8))
- **filter-operators**
  - support for operator property on filters ([9b19dd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9b19ddefaf6b6e29f94b59697d0f39471b3eb149))
- **cookies**
  - add possibility to add samesite and secure settings to cookies, set SameSite=Strict as default ([cac229](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cac229d56a08d5f6d40f297252dcc369bfe8ee73))
- **datetime-input**
  - make it possible to use the configured format as input format ([416351](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/416351c2a20dc362088ad9faf264185c5c175cdb))
  - separate constraints for date and time ([c002d2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c002d271b119c5a013801b11275a602597553bbe))
- **dropdown-children**
  - make it possible to give a max-height to a dropdown and scroll it to a position ([12a790](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/12a7906a4c0f79f9f786224662262a30d5ecf4d9))
- **timepicker**
  - support am/pm time format in time picker ([c89512](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c895127d4cf0195b446c4f4d1ca8e2284a6e9a69))
- **connected-react-router**
  - replaced connected-react-router with react-router ([d7533f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d7533fe16ced2a4a688f6a30ce8a8bbf21809d43))
- **modal**
  - improvements on rendering of modals, separate styling of modal to separate component ([8aafae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8aafae06f11f74a1adf2d6cf7417d8f9285c9210), [a6dbc8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a6dbc84ff125ff0749e28f290b9b8038f87a77da))

### Bug fixes

- **list sorting**
  - fixed sorting on table view in lookup list scenario ([bb4820](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bb4820faec827b25e22818c84519c5ee5c5ff039))
  - fixed height issue with table sort icon ([c09aab](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c09aab383eb97be737ddcaac40f1b8fb82b2796f))
- **checkbox**
  - correct visualization of checkbox groups in error - [BIPD-10509](https://support.beinformed.com/browse/BIPD-10509) ([58f557](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/58f557217b7a84009f4ee7b097d22333c18af0df))
- **readonly-string**
  - return empty string for empty readonly values ([f0b343](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f0b3435127496835c13528fd4d573dab89ec71ee), [9a24ae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9a24aececfe2ac411964dd6bb73f4bd15cea01b9), [d88dc8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d88dc89234f9f4eb34717eb6d29bb9445337ba2d))
- **datetime-model**
  - prevent nullpointer on formatValue method ([133c17](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/133c17b452c817b3ad8a055bf665a5c9f58ffb84))
- **composite-attribute**
  - check if equals method exist on child - [BISU-6556](https://support.beinformed.com/browse/BISU-6556) ([79d3e3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/79d3e37f9af037d5718792d313e9416e10d88783))
  - prevent rendering of unavailable attributes that have children also available on root level - [BIPD-10437](https://support.beinformed.com/browse/BIPD-10437) ([f87dbb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f87dbb621890d9ceb6f3f7c27507e9845e9eb553))
- **datetime**
  - pass onBlur event to date time picker components ([a60fa2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a60fa22ecf5e31cf0fbad67a95dce4c82ffed825), [e6a9f9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e6a9f95bef37a3efa79a933240d847e1f17d9e2b))
  - get settings at runtime to allow overriding via properties ([83f452](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/83f452f0b33e84afb7dc532bcebde1ba966aa799), [edc1d6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/edc1d6de113f0662593aa948644279222fb054fe))
  - increased width of date time input to fit placeholder ([297d62](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/297d62c92f78dcf9b33559a8135d3c1d94b847dd))
  - datetime validation and translation fixes ([87e9ad](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/87e9ad316c952d5d285ec55fe593bef8c5a7aeb5))
  - fix prop change of date time values ([29a02b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/29a02b57be84147bab18b925f9c01e87da5ec496), [64cd90](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/64cd905ac2a033fe664099986c2a1a27246912b8))
- **timepicker**
  - pass onFocus event to date time picker ([e474cd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e474cdac31b5c438112906342ef5fd1057d68fd2), [71f005](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/71f0055e2e017f19118290f6a982f73edc24018a))
  - pass onFocus event to time picker button ([29c228](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/29c228f299e15193d3fc8137d4f060f0446e4ae8), [29fa7c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/29fa7cbb6d6334e9968d52ba06e25199a35ead0f))
  - update timepicker dropdown ([90eb64](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/90eb6449eda061a228624ffc84064712fdc6bec1))
- **eventdata**
  - remove attributes that are not present in data ([17b371](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/17b3717de028847cd7ab6487480bbd80c63cf7aa))
- **attributes**
  - corrected visualisation of form attributes ([c2f4fe](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c2f4feaa7dc2037be86aff7cc3e329be130b3af7))
- **serialize-javascript**
  - replaced serialize-javascript with a rudimentary replace strategy to prevent xss injection ([1b7355](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1b7355ae38e0c3b4433e4c462019af74e13038f5))
- **wysiwyg**
  - keep allowed html tags on matched input ([a296ce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a296cea91685fabd504d357ade7a78b45851bccf), [0881a3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0881a31df857026bf17a121dd01797b2d2691bf9))
- **theme**
  - fix rendering of headers, inherit was wrongly used to re-use header fonts ([96778e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/96778e02a38b1a158ec6881b017e636adbb70f77))
- **range-attribute**
  - reset validatedValue after change of mandatory property ([fe355a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fe355ac3cf3f26aa19999ec10cd98b1bba63ddd1))
  - add mandatory range constraint for mandatory range with optional childs ([1ed221](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1ed22117ecfaf2e4995166f8e5e020a5ce9012ce))
- **memo-attribute**
  - pass row contribution to input components ([ae6c0e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ae6c0e219aef4efd113e192b029d1e1b8faa2671))
- **validations**
  - when a validated value was emptied, the cache was not emptied ([bf6e5a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bf6e5a4e338370468c9ad79c8056e4cee55ef81b))
- **filters**
  - only allow filter submit when all filters are valid ([2644a8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2644a80a99077be4433b51d9c6635210f827a97c))
- **daterange-sameday**
  - fix rendering of date range on same day with only time in format ([a839ed](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a839ed6b58cab339280016b56d80ce05d2be45b9))
- **timestamp**
  - fix handling of min max date on timestamps ([bc7b34](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bc7b345819446329f50ee265f1dac2284744f44b))
- **inline-edit**
  - update usage of DateTimeAttribute ([150ee3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/150ee3658cfb65c4240da0b86710725bb90fa155))
  - handle errors on initial request of forms on root level ([2420d3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2420d35c3925a95407742ce8ef4ed6e7ac9a8115), [006b28](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/006b289c10ef5d9859e673e24422f920a5845b0f))
- **timestamp-input**
  - update timestamp input format ([31d209](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/31d209c66489796d9c1937f43ecd652e7e04f094))
- **input**
  - prevent unwantend grow of input group addon ([bcfe2d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bcfe2dea97b0d21df9698fc3714aefbb6a46baf2))
- **datetime-input**
  - update rendering of date parameters received from the server ([a5b6ab](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a5b6abfb0dd7d9ee6d0886faa57bb751a5238cb6))
  - allow special date formatting ([8ac4ae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8ac4ae3f2a2348f58bc2c8631594e434cb2b0d75))
- **composites**
  - update optionality of child attributes of optional composite attributes ([c9d9f1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c9d9f1391b5e05bfb279ff35772fb7f95e8add1b))
- **modal**
  - fix memory leak when setting focus on first input element ([b22e4f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b22e4fc6948d2e6371711f8dbdf5f79ccb8b987b))
- **locales**
  - locale defaults to first available locale code if accept language as specified in request is not available ([8b7091](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8b70916c8ed1e16325085b87c7b70585d10d7c46))
- **dropdown**
  - handle styled component for dropdown button ([3cc8b3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3cc8b3e6b19a85586e3029a3b8b58ea8421dc0b8))
- **multi-row-task**
  - sync the selected items list with the current list to prevent selection of deleted items ([7e1744](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7e174433825a703c2fc25d3a9e6cde9802f131c5))
  - only render multi-row-task when there are list results - [BIPD-10446](https://support.beinformed.com/browse/BIPD-10446) ([bd9f06](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bd9f064f0d77ca9359f94473580ffe981b4f0170))
- **layout-hints**
  - remove unused layout hints ([6e2b5b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6e2b5b329c0ae18077187efbaf90ec1141c28bfd), [fb9345](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fb9345307db93278fff42bb2bc4865cf4f10b4fb), [2aa10c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2aa10c6143774f2d287af093254a90b807b44501))
- **form-model**
  - handle errors on initial request of forms on root level ([11a62e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/11a62ed4ca2ebdb6f7ec415344267af64d0f8fa4))
- **instrument-result**
  - only render instrument result on next event question or on end of form - [BISU-6530](https://support.beinformed.com/browse/BISU-6530) ([284910](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2849101de8bbe0bc54d01cb987c99962c815ff25))
- **form-focus**
  - don't put initial focus on form error information ([d70da5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d70da58524cbd5e8d146afc6cdf1fd6174b02a5b))
- **userprofile**
  - hide attributes that are not available in the data service - [BISU-6514](https://support.beinformed.com/browse/BISU-6514) ([81762e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/81762e6904334fdcc71ceb4c7459791e97e3e4ee))
- **baselistitem**
  - move listitem border from base to the listitem. prevents difficult styling ([51e524](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/51e524905f98fa6473325e1f1c5ac4fdaa5577d7))
  - replace hoc's with hooks to be able to forward refs ([01de82](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/01de828e6d5ffc526ddd2715837b58cc64d5df60))
- **tables**
  - render tables with display table properties to give better column distribution ([a79dfa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a79dfa89c3b821d6062062174a5a5cebcd5c8842), [4a94ce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4a94ced1bcfffaf145fe9716adb0b4573a071dc0))
- **column**
  - prevent large content breaking out of a grid column ([df351d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/df351d7a03af560d7265f5a8146be8e53e090381))
- **empty-tablecell**
  - render nbsp; with the unicode value to prevent react problems ([6fbc57](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6fbc57a64f439f12b7dcb0e7fddbcc4e7df4018a))
- **modelcatalog**
  - update rendering of concept relations, separate incoming and outgoing for concept types - [BISU-6520](https://support.beinformed.com/browse/BISU-6520) ([33075d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/33075dfe2939855f837c9e32601a7217a9c3ba1c), [5823d0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5823d03d90241861c08cd9a7103d78facd41617f), [05fca7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/05fca76620400c1816d8207e03b97d2e89507758))

### Style

- **upload**
  - fix focus outline on upload fields ([594b41](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/594b41c08c10a21b06bdab694206d5f936d6fa7b))
- **timepicker**
  - fix rounded corner on timepicker button ([be3d6a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/be3d6a7393cbf2eb3acc757d3c137758dd87379c))
- **range-attribute**
  - subtle change in wrapping of range attributes ([76e011](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/76e011b0f78d1b21eee43ff4f73cf253780cbdcb))
- **inline-edit**
  - align checkbox, radio and toggle input elements in the middle of an inline edit row ([092342](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/092342b63fa4de530734b2e2b8b4ba697045496b), [a6a33f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a6a33f9e9b2edc696b811534516f1696fe320e50))
- **radio-checkbox**
  - center align input element ([187b60](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/187b601e8844861e3d9928fff5bed5b274bc1523), [082333](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0823339f65a64efc5309cac137a435e8a44da894))
- **attributes**
  - update css class name on attributes ([c72c39](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c72c395ac645a3d5b81ec0e7710f27216fc102b7))
- **tooltip**
  - update offset of tooltip ([e65b69](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e65b697caa98a615b20f562cf8754e81e1db7829), [d09be6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d09be69e2eb697e21364ad3bdd57c2ecb2bebb67))

### Refactor

- **datetime**
  - fix lint and flowtype errors, rename DatetimeTimestampFormatConstraint, fix tests ([d95334](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d95334f633d5c3d3447ca40132785730f0c80923))
  - update rendering of duration, move outside styled components, use intervalToDuration ([209829](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/209829c83f98ea41d94913efa1a51020db1ebae5))
- **filter-operator**
  - update operator to camelcase ([9a0a1e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9a0a1e88d96da6eaabeafe473d37d67b271c783b))
- **upload-attribute**
  - rewrite calculation of total file upload and add unit test ([154845](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/15484530bfaa67357cd7fdbd024d350d2ef7984f))

### Tests

- **bsn**
  - allow bsn number with spaces as delimiter ([c6cb91](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c6cb91b053d58244ac71b01520925b0ea9ddc95d))
- **datetime-input**
  - add unit tests for datetime attribute ([e86b94](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e86b94f8c73195fe8b14de79bf3328d635eecbe4))

### Build

- **ie11**
  - move polyfills to webpack build to make sure they are loaded before the app ([e2a153](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e2a153c94f8426ce3fbc2f735910e6abe6370550))
- **react**
  - use new jsx transform ([cfaf74](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cfaf740e865f7acf841f7894d0bbe9ee69a8a5ed))

## 20.1.0 (2020-06-19)

### Features

- **server-preference**
  - add server preference 'isStudioContext' to indicate if in studio context ([b12ea3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b12ea3ce88b2e00e4d3cb5ef499836286f07fa94))
- **attributes**
  - use visible method of attributeCollection when iterating over attributes - [BIPD-10395](https://support.beinformed.com/browse/BIPD-10395) ([0357ba](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0357baf19e334701185151d1b4d45b38c6fcf476))
- **layout-hint**
  - new caseview-link layouthint which marks a case id ref attribute as the selflink to use for listitems ([a3743a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a3743a2507ba5ea580e04fbeeb732fac772cb71a))
- **list sorting dropdown**
  - sorted the list sort dropdown alfabetically ([91c412](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/91c412c27a7c7ff4a17c7b39e200c2424749a9e3))
- **list**
  - implemented new inbox view to support inbox modular ui services ([cd99b7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cd99b7c1cc84b624d418e77d38936cb6085fed3f), [78db1b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/78db1b61914ceea17a970db79d1212215fce5855))
- **table-view**
  - make table view backwards compatible with display property ([40d371](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/40d371f8e98838702d176df7871299ca9ed69ec7))
  - let table view components in lists use the same styled components ([00c72d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/00c72d7e02c5bd4f8c024110f1a169f99e46a9e8))

### Bug fixes

- **error-notification**
  - go back when clicking on close button of error notification ([49a65b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/49a65bdaa36fab4c765555b3a9964c14abc47390))
- **datetimepicker**
  - removed delay on setTimeout callback for date time input ([57cba5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/57cba5308ca9d2628e3e139369b204a0d53d71fb))
  - set small delay on bringing back focus to input after datetime picker - [BIPD-10245](https://support.beinformed.com/browse/BIPD-10245) ([5aaaba](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5aaaba1508a213c2db054cb0b0af3fbda2c1cf15))
- **popper**
  - use offset option in stead of margins for new popper version ([144545](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/14454571821af15ec0ff4159fe9600d32b57aaeb))
- **attributes**
  - hide specific attributes from list, like CASE_LINK - [BIPD-10395](https://support.beinformed.com/browse/BIPD-10395) ([a812fd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a812fd7c2643d90957a23afa6060ffe663121dd7))
- **modularui**
  - reload of a model removes the old model when the resource is no longer available ([eeb0ab](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eeb0abb52384f8966ad579658482c7f3a803af63))
- **form-buttons**
  - rendering of previous buttons should take repeatable attribute sets as first question in account - [BIPD-10386](https://support.beinformed.com/browse/BIPD-10386) ([427d39](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/427d39ee55156e22763ee045d39bd6ca9f8fbf91))
- **dynamicschema**
  - not cloning data on creation of attributes gave an incorrect dynamicschemaId on choice atttributes - [BIPD-10379](https://support.beinformed.com/browse/BIPD-10379) ([c6b102](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c6b10224d7b435db3faecfee877c38fb0021639d))
- **attribute**
  - added word-break to read only attributes ([66930b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/66930bedf369c285d0b4447428a3355ae9027bde))
- **lookup-list**
  - make it possible to sort a lookup list - [BIPD-10383](https://support.beinformed.com/browse/BIPD-10383) ([717a03](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/717a037c75526b882cde5490f83f03b6c10e9a8a))
- **form label**
  - font weight on form label follows theme ([565525](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5655252bc6fe3bf682f39fc2d8bdcf61bb9fd6be))
- **skip-filter**
  - move SkipFiltersLink to separate component and skip it in initial focus check of modal ([ad9762](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ad97623cda3fb08cb55ad0c33f6c31505a3d3342))
- **formatted-memo**
  - set correct encoding for html entities when using a formatted memo attribute - [BIPD-10374](https://support.beinformed.com/browse/BIPD-10374) ([3380d8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3380d871bf4d3ae3be1f6886155932e800f19b4c), [582073](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5820734aa8a0448f717eb344df4bc80e436e0016))
- **pagesize**
  - pagesize is only available when it is also set in the data service ([5cc8e0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5cc8e000854f77fd0a6c0e00960cfd729b61e136))
- **dependent-attributes**
  - evaluate all configured dependent questions to indicate if an attribute is visible - [BISU-6463](https://support.beinformed.com/browse/BISU-6463) ([4a415e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4a415e5105664fb47248848800fcd4702d6fcae4))
  - let dependent attributes work with boolean attributes - [BISU-6435](https://support.beinformed.com/browse/BISU-6435) ([cdbd6c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cdbd6cfee49aff3bca25db735a897fa8f4cf4018))
- **filters**
  - remove exception when filter information is not complete ([0f5972](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0f5972bc581f5d464d63b25eb9fb5fbfcb7e2175))
- **boolean-attribute**
  - correctly update boolean attributes when navigating back and forward in a form - [BISU-6485](https://support.beinformed.com/browse/BISU-6485) ([5eed1c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5eed1c8d71920e2ba7bc05368d55793088626738))
- **validations**
  - make an instant roundtrip (leading edge of wait timeout) for attribute set validations ([f6bc65](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f6bc65df9f08e20b0ea9894937885014759f14eb))
- **captcha**
  - make it possible to mark attributes as not usable for dynamic validations, fixes problems with captcha - [BISU-6468](https://support.beinformed.com/browse/BISU-6468) ([118ba4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/118ba47585af3f872dde7965cc5b77b688a53c5d), [9445a5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9445a597c53f743373052964005c05afc7a899b8))
- **dependent-questions**
  - submit empty formdata for hidden attributes to overwrite visible value - [BISU-6461](https://support.beinformed.com/browse/BISU-6461) ([697483](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6974832d89fd7522396b2bdc6f475068920bd0ea))
- **i18n**
  - update faulty dutch translation for block user ([1f3f8a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1f3f8a4c78417e33695213ffa896bd4ebb83dab5))
- **attribute validation**
  - fix attribute validation after pick of commit 9445a597c5 ([782aa7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/782aa7952534ef3be8580e8cda443a06a8947365))
- **custom-locales**
  - load correct locales when enabled_locales is configured on theme ([2b8fa4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2b8fa4d615018f17860173f142280c05ecd28608))
- **grouping**
  - render choice attributes with dynamic schema on list grouping parts ([9cc8d7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9cc8d70616b2672baa3ef3b77a6c5e0c6c192dcb))
- **choice-attribute**
  - re-implemented stacked rendering of choice attribute ([3a06b9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3a06b9c7ba55041356b9569fc46a9200a8e9af52))
- **layouthint**
  - add dependent attribute control hint to boolean attribute ([7e4d55](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7e4d557e432d727091c9117d19eb9c2c0d1a5445))

### Style

- **multi-row-task**
  - update styling of multi row task in combination with paging ([234084](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/23408466b8e7bd121a4eb3274e1c78661e5f8527))
- **inline-edit-button**
  - update styling of bottom buttons on inline edit ([55cd62](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/55cd6270a7ae9ac19d375a6a4e617b477c0da804))

### Documentation

- **storybook**
  - implemented form layout knob on form attribute stories ([16cce1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/16cce1c1a25e6a499e99bf299111daaf247e3fac))
  - added story level decorator for choice attributes ([d76dc6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d76dc6906460fc861d2ddc5b020d122736749a27))
  - added focus-visible to storybook configuration ([aa5098](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aa50983279155d99840da00c99d81b7e81281706))
  - improvements on choice attribute stories ([27521c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/27521cdd5f0fa7ab4882b2660afc646d052657e2))

### Refactor

- **sorting**
  - replace sortBy lodash method with Array.sort native method ([333e75](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/333e75f306a7b7b392e3f6d9d3698dfbdd4027d0))
- **attribute-formdata**
  - replace formdata property with getter ([a12f07](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a12f07f32980d2f4f22d1861c99a06b2e2d1d20e))

### Tests

- **eslint**
  - fix probem with react-hooks/recommended ([0dd2fa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0dd2faacf1fe8ae446ecb845b17db842532ce9c7))

### Build

- **lint-staged**
  - remove flow focus-check, takes too long ([5946c5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5946c5b47d4316cac7a1272ee65d5614ac3ddd6e))
  - detailed config per file extension ([38b169](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/38b169ff5429f5830e693343bce1688f5fb63d1b))
- **compression**
  - generate precompressed resources for production builds ([fab48f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fab48fa9a0cc8a8cc15519254bdf968e512937b7))
- **dependencies**
  - update popperjs, date-fns, polished, react-helmet-async, react-popper ([dd056e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dd056e21a7cafb1871985e588b3108ae67ffc97c))
  - update material design icons to 5.1.45 ([aa447c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aa447c159c1db97650eddc23616854d90ab9fb83))
  - update core-js to 3.6.5 ([6a0bdc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6a0bdc8f6160af32c8e0bea04452b33f412f360c))
  - update react-popper and popper to v2 ([783770](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/783770ba5d1d39282de153f4ef10089a6f906eac))
  - update dev dependencies to latest version ([b5e8aa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b5e8aacd4d5fd3916e061dd4622493425d914e0e))
  - update dependencies to latest version ([bf3b41](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bf3b4105fd17a085789078b15ebb26140fce0af6), [fbb72a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fbb72a1d0188aa4df00081effa447674638fb1d8), [227f97](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/227f977c377b397f11cbce4e534e24aeaff174c5))
- **prettier**
  - update prettier to 2.0.2 ([415254](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/41525421f2e9a03e9ba278ba5d6827679f5e4bfe))
- **babel**
  - update babel to 7.9.0 ([675672](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/67567207cd0e1e5c0a31b4b28ad19ced7a133e8b))

## 20.0.3 (2020-03-19)

## 20.0.2 (2020-03-19)

## 20.0.1 (2020-03-19)

### Features

- **react-router-link**
  - allow string as href property ([d790b8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d790b8ad767dd7292637885a34639bc048edafbb), [240ef0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/240ef0b8dc1f10875fc24f72bb2ad36ac1426210))

### Bug fixes

- **authentication**
  - basic authentication did no longer work because of changes to error handling - [BIPD-10290](https://support.beinformed.com/browse/BIPD-10290) ([17a929](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/17a92917daa1336f083e872e51147eaad4f86fcd), [f96ef7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f96ef77b64083edb9a73c3074d6a1b5d0224693f))
- **icon**
  - update renamed mdi icon settings to cog ([9f9810](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9f9810b6e52ad0e23e9980c885c44ebe60ccdfaf))
- **storybook**
  - update import themeProp from beinformed theme utils ([6473c8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6473c855513980246cbf74fa1db4f5cfdf31ca7c), [4ed07d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4ed07de401df8b5bad887329b8ff496bfd7deae3))
- **filters**
  - reset page on list on filtering to prevent empty pages ([021698](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/021698a61f417e52841f5148020b1edee2a9ea36), [ad1655](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ad16550136dd2099312dbbc1e013f3cdb98003f2))
- **preferences**
  - update reading of server preferences ([77bd51](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/77bd519dde8595a073fda8f1291df6b0d8220aca), [38e36e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/38e36e18d1646d4091c9389ea2580d4b6c5a8cc4))
- **validations**
  - prevent initial validation request on validation request during updates ([ccefc8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ccefc8df7b0c7d796c61361aabfff89ae629829c), [dafc2f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dafc2fefc15736074d3e93a61e9b39a19aca9dea))

### Documentation

- **storybook**
  - choice attribute stories for form and readonly view ([b621b2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b621b21ac2373e24041835476f0e4897d98a5bf4))

### Build

- **changelog**
  - set correct release date ([692a3f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/692a3f0a050c7b9fd4b25b36d1637144cf4a59bb))
  - prefix tag to make distinction between different layouts ([e7009b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e7009b47db4e7ec730d08c76effd361916d809c4))
  - set correct version above list of changes ([4068fc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4068fc1a64ae7ce1e84285ed2526bef0e98c392c))
  - create changelog generator ([0eff8c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0eff8c990898f231728fce66a54bab4845b49a74))
- **dependencies**
  - update to latest dependencies ([5131c1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5131c129e6670f19cac3cc58ea0859dc0121ab09))

## 19.2.5 (2020-03-05)

### Features

- **paging**
  - only show paging info if more than one page ([ac2977](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ac29779ca6d07ef7629010a4766ba2d6ffcc52fa))
- **graaljs**
  - renderSSRMinimal no longer returns a promise, but a string ([963a94](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/963a94bb7ff0e7d01ac1690a72f3a42bd150edb5))
- **task group improvements**
  - column size change for task group improvements ([a27bfe](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a27bfe482d25fb7ec13566f0ffac6b415eb619bf))
- **lookup-list**
  - update structure of lookup list for better customization ([f50563](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f5056372aeda98026735d142f87dfc335d495aaf))
- **column**
  - add offset property ([4f46ad](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4f46adbbf96e40d11a8749371e87e2a927093d7b))
- **theme**
  - update styling of tooltip ([c6d02f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c6d02f9185cc1a113667ea37e4b38eed4439bdea))
- **alignment**
  - ony righ align for money and number if no align layouthint is set ([aa3bb6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aa3bb62a7a1111121c86ad0a19fabc58fc1bfd48))
  - alignment by layouthints with defaults for money and number attribute ([19cb80](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/19cb80b7952f88a0f3f2a5fe67420e46b2e7d0b3))
- **list panels**
  - implemented layouthint has-list-with-filters ([4e4499](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4e4499e7798206d72737ab68ad30b5432ca283f6))
- **filters**
  - removed chosen filters message prefix ([c3726a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c3726a561a778511afe6a051a451bb3bf8e5a252))
  - conditional labels on chosen list filters ([7ceeff](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7ceeffced30022e8d6f3faf29c9bf9b3c3e840de))
  - make it possible to hide the filter button on a single filter ([94ee71](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/94ee716ba77a6639fdad3637d1f92ed645ae4a3f))
  - rewrite filters for better interaction between user input and server updates ([366176](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/366176539e4818ffccc4b7a7040e828c0e59a013))
  - separate range filter and re-use filter input ([a0d7f1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a0d7f1d0d388613510948d7c2821fcda8509d138), [a2b47e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a2b47ebfde670368f43811094944f8c6e5412ecb))
- **attribute alignment**
  - right alignment of money and number attribute type in table view ([c271ee](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c271ee73e7169e1c383b3144640f9fa5308ef657))
- **list**
  - render total item count on list root element ([293b0f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/293b0ffcc21c226424110b61cd0ef1b9e7b117e0))
  - add openListItemInCaseView property to lists ([6bb2e3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6bb2e3eb817a04ea192dd52e684aba1b9beae006), [82b043](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/82b0431da03577c221e3eea99e867c84de5f2b26))
  - make it possible to inject available list views ([cd82b5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cd82b52fc03f3f14e30ffca047882f1e142ba42b))
  - add formroute to listmain view ([ab733e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ab733e93ea8421ef25cc54ea80979eb7c2e4ab1a))
  - put ListMain rendering to separate component for easier customization ([97a832](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/97a83258a6bf460bd81a231ae955e5cbd9da5824))
- **list**
  - isRoot property available on List component tree ([e6e85a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e6e85ab86287d32b2d55942648785b8245d19702))
- **conditional paginginfo**
  - conditional display of paging information ([5ae7d7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5ae7d7030bd0cf7bd38e71ab8b13202db660db84))
- **filter-panel**
  - add isOpen css class to filter panel when it is expanded ([6e5cba](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6e5cba9e611cb1c1a5c8cb71562d411f23b4f7e3))
- **theme-utils**
  - add hueAdjustment parameter to changeHSL method to be able to make slight adjustment to hue ([a2871d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a2871dec1db04753ff608330ffc1e00debe65fb7))
- **flowtype**
  - update usage of flowtype to give better type safety, intellisense and refactor possibilities ([626fda](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/626fdab4daadf360a97a1d09d5177ed3d686e32a))
- **attributes**
  - replaced createAttribute hoc with a BaseAttribute with render prop ([0d1a3c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0d1a3c07ec45264025992fbddcd5fdeb27c15167))
- **date-model**
  - combine date, time and timestamp models into one datetimemodel ([d1e287](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d1e287058d13b422f5afba3eb416d86091ffef40))
- **storybook**
  - story for ListMainHeader component ([766022](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/766022ce4ba09bb738b155f2985b85afd2537699))
  - added listheader story ([9323f9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9323f972c07032bb63107684b4a3b6cbb08faaa9))
  - added readonly variant for memo attribute ([521bcd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/521bcdb21555a79813ba030cd9d2494c72c88f9f))
  - story for money attribute ([33e09d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/33e09dc0ab43de843030034cf9494974cc211d04))
  - created memo attribute story ([5227d1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5227d1e4e883d4aec217e9a246ad8c356ef33a66))
  - update number ([9ee719](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9ee7194c3c0cb9dbb01103bdff8dd38915f60017))
  - added money attribute to storybook ([de2977](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/de2977978e3271700c715c43f25425609160e788))
  - added number attribute to storybook ([74dda9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/74dda98ffba63301164d8e4009fd28856390175d))
  - add string attribute to storybook ([0ba3b0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0ba3b0fcefb814450b3013d559157b5c42af8610))
- **pagination**
  - added results string to paging information ([acb5a2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/acb5a22c5c568af052e75642708bd61c91c978c7))
- **modelcatalog**
  - convert class component to functional component ([75eaec](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/75eaecbbe44b166fd11f7d69921078a5862b2f79))
- **form-content-renderer**
  - convert class component to functional component ([7cdf6e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7cdf6e75a8d089e75a3c2dce4c1e97a2d6945349))
- **money-attribute**
  - convert class component to functional component ([a1c2c5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a1c2c5ed15e8d4b292a5e633cc0ad752adf9f49a))
- **attributeset**
  - convert class component to functional component ([047c37](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/047c37490c10fe3ae31fc92acbd848fcb4dcb51b))
- **number-attributes**
  - convert class component to functional component ([74ace8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/74ace8895bc88c7e0ede296fe531baa930502de1))
- **modal-form**
  - convert class component to functional component ([57ea8b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/57ea8b824335bf26c1cf0f650d5b4ba1599e03cc))
- **fullpage-form**
  - convert class component to functional component ([4f0273](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4f027383e4ea7d29bd4ccebf37eb719008191a5c))
- **themeprovider**
  - add customizable theme provider to provider theme settings though view component ([5db014](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5db01422c0467f2e4e45abe58b9517d45bf0244f), [91fd9b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/91fd9b77c7a28b229d6c0549a99ce8d228e12ff9))
- **download-link**
  - update download link with href information, remove from link component ([7e7cf2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7e7cf29d56af3f6913ddaa290ae8de2b428be4e4))
- **formdata**
  - generate formdata through attribute models ([f77114](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f77114107f9c6ac8060769509e7e7bddc3d326a8))
- **time-range**
  - add validation on time range ([8df5fd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8df5fd4ee894f6f8cc68c0fbe6880c8042b22594))
- **modularui**
  - rewrite of modular ui hoc and form component ([8607fc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8607fcd80af79447c43e056ab2815c9003b8931c))
- **chosen-filters**
  - separate chosen filters component for better customization ([8edb7d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8edb7dd902dc15c9b146dfea68f509364f550527))
- **attributes): feat(attributes**
  - use createAttribute hoc on all FormAttributes, introduce BooleanAttributeModel ([70fa29](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/70fa298848f519f6b32ef65f3129c877f9b7dfed))
- **boolean-attribute**
  - update position of toggle control ([206d19](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/206d191ba40d015e414e7233c920f0c1aa5f172b))
  - introduce boolean attribute with switch visualization ([658960](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/658960b87bdf67fb4ffad31d8df49a49a19d4b72))
  - render translated default options ([ec8d08](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ec8d08c5adc1b8647de2688e71dc5b15ddd6e4e4))
  - render option labels where code is a string ([249bec](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/249bec43643e36d5a5caef7d0e9099bad0c1aa84))
  - add logic for boolean attribute to the ChoiceAttributeModel ([8b921a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8b921a2df64ce9e5b0ea3e6238f97d400ad3a1aa))
- **cache**
  - copy sessionStorage between tabs - [BISU-6295](https://support.beinformed.com/browse/BISU-6295) ([e40893](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e40893cb8075c164110032f930fb0887ea7cf5ae), [953f51](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/953f51ddbec0745c2442704162b0691e41c02272))
- **focus-visible**
  - add focus-visible polyfill to render focus ring only when applicable ([c5f196](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c5f196676fa34f99b8cbf3bc19c55132f4fd1b41))

### Bug fixes

- **upload-attribute**
  - render correct upload information when going back and forth in forms - [BISU-6282](https://support.beinformed.com/browse/BISU-6282) ([edf8f4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/edf8f468f3aefc6ccf519bb1905b8b45b2fccdee))
  - set readonly rendering of upload attribute to initial value to prevent unchanged value ([bfbf38](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bfbf3825033d7ca3198f66fdb73ca61260602612))
  - send UNCHANGED keyword when an upload field remains unchanged - [BISU-6331](https://support.beinformed.com/browse/BISU-6331) ([233c67](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/233c670cc625bfbd8e6a3aac95898acd79e4e038))
- **repeating-attributeset**
  - render cancel button as link button ([433d4b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/433d4b1b6624b2bac4ee5d7eb24fd1d7bdd1455c))
  - make sure the current object is emptied when input is cancelled - [BISU-6369](https://support.beinformed.com/browse/BISU-6369) ([9499e9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9499e91795f72c1ae8682be766dc3a4f6c57c84b))
- **modularui**
  - add useEffect around reload do prevent unexpected reload ([4b4ca9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4b4ca9e27225f7b3f4018e9881f5535d0c6a5e48))
- **dynamicschema**
  - render dynamic schema information on filter options with composites ([ac287b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ac287bbd8f1914cf94de1d348e75b85a18e35a9c))
- **form**
  - readonly attributes must always show the latest values from the server - [BIPD-10265](https://support.beinformed.com/browse/BIPD-10265) ([e72e7f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e72e7f406796532b7b427ad24c44afba4b6cab14))
- **composite-children**
  - add hasValue method ([2f8ccf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2f8ccfa9da10e51dc65c1e8f798bc54dd1ba1faf))
- **list-detail**
  - load list details into ListDetailModel ([a19455](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a19455ae258382e032f7dec25a52403c63cd8c63))
- **listmodel**
  - shouldHide method must check for active filters - [BIPD-10254](https://support.beinformed.com/browse/BIPD-10254) ([faf9af](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/faf9af46ed554106990a9f583a1586c8b95dfc26))
- **label font weight**
  - font weight for label based on theme ([515d2d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/515d2d93098ed9c68f4fab66e1e68dd484752eb1))
- **optional-indication**
  - process empty error validation return message ([9d4a69](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9d4a69271194d3105f71091e96e35b4b661cc6a9))
- **mandatory-indication**
  - attributes where wrongly marked as optional when an empty string was entered - [BIPD-10233](https://support.beinformed.com/browse/BIPD-10233) ([12923a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/12923ae77f9219e597e51c928e48cf66cd11508d))
- **form-route**
  - remove react.memo to prevent the rendering of out-dated form routes on grouping panel ([8ce597](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8ce597f41d9ac3c0bb94fc13b9414c004f9d3a24))
- **content**
  - render instrument content on list results ([739f8f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/739f8fe70aeee40fc5a7fdbbe7c658fcd8f965b9))
  - render content on grouped input in a column only when content is available ([da59c8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/da59c8bcfcb7391f5aa743d15a8b3c10fac634f6))
- **hide-when-empty**
  - additional detail rendering must follow hide-when-empty configuration - [BIPD-10242](https://support.beinformed.com/browse/BIPD-10242) ([131121](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/131121c38bbb23ee04df45fe2bfe4c3f089c2e2e), [b091cf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b091cf2c3976d46c5914da5d7053a9ff78004bb6))
- **number-input**
  - separate format and grouping constraints ([e5daaa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e5daaa56eeef758bf8ce98168064a107aac14e2f))
  - handle empty decimal and grouping separators ([320ef3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/320ef3bc9acc7f84b071f97c4e55828bf5180aef))
  - stricter input of numbers with grouping separators - [BIPD-10240](https://support.beinformed.com/browse/BIPD-10240) ([5654e4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5654e4f149392ab5e8e599cf21e9d3f46939b9e4))
- **dropdown-link**
  - fix disabled dropdown link appearance ([099981](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/099981826fc56ef8a02f986e0c8066133fe87bac))
- **chosen filters**
  - propery check on assignment filter values ([9499c2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9499c2ca74d685892bdc7dfc4dd60a0fa31ce4b4))
- **filters**
  - changed chosen filter to span element ([772deb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/772deb28fa589990446232b35ccfc2e9d5d12acf))
- **panel renderer**
  - added default value for panelOptions ([c1e50f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c1e50f03c162a8fae81771f25906b55d1cbb3a04))
- **alignment**
  - added alignment for cells not renderd as link ([587e64](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/587e641efbd24d4a639d3c008cc8557bee1941ee))
  - handling alignment with optional attribute ([1f5b58](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1f5b581426bf87684681682df4676a64347d9369))
- **tablecell**
  - alignment of tablecell attribute values ([2fb914](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2fb9149cb11a1490edc265d3451084dac46d5b39))
- **paginginfo**
  - moved conditional showing paginginfo to listmainheader ([b10790](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b107903d68dd0dc0706c41e198a18c2808a668d6))
  - always rendering outer paginginfo div ([61320d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/61320dbd2b70fdc0f8d85da04bbc35cd195fc22e))
- **baselistitem**
  - make active link inside base list item inherit from parent ([201c06](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/201c066e7e801c486d4dd5a657ae8c138e16d1d9), [772458](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/772458ae6f4a2bf768942b9eca6e424847afed63))
- **autosave**
  - debounced autosave method was no longer triggered ([31d8bb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/31d8bb7da970b44a83b68bb58a9f53f7ed1830c8), [5396da](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5396da86480065a3de332628acd0f537c5b4476e))
  - update form model after autosave to indicate autosave has happened ([30dcdd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/30dcdd34d3cd64c2679974c6491314ffa25dd739))
- **deeplink**
  - retrieve correct querystring parameters on deeplinks ([e816c1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e816c1adb22aff38209dbb14402364864f86a285), [ccc604](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ccc604af3939320e0952499aad4ce1474b7bfb63))
- **unknown-repeat**
  - improve button state of unknown repeat form objects - [BISU-6369](https://support.beinformed.com/browse/BISU-6369) ([0336bb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0336bb9ab16f338d710a783fd3257c655cb66def))
- **range**
  - start attribute must be before end attribute ([b33082](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b330820a48eb1287a694443195aeb24d13267f92))
- **datetime-renderer**
  - handle datetime type ([a60eba](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a60ebacd49e405cfca3d8a256047a0ff8a524810))
- **attribute-renderer**
  - render datetime attribute when model type is datetime ([449518](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/449518829309b721f2bcd9ce628e86faa8b8eddb))
- **time-attribute**
  - take old time iso response in account when formatting readonly value ([428947](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/428947793edcc4337fe14524746c5683f1bee6b0))
  - readonly rendering of formatted time attribute ([ca9207](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ca9207dbe5a9e52cc8ef14df82fb2c739918b943))
- **date**
  - check and rendering of exact date boundary constraint ([c14bca](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c14bcaadc43c70744be3ae9c7357650cb4dbde3e))
- **range-attributes**
  - make name and id's of children on range attributes unique ([2e76ee](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2e76ee7547624dd8dc189cb6dd9f7e7e20129303))
- **action**
  - add forwardRef to action component for dropdown usage ([5079a4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5079a489f1616a0a3b4f6fd9324601bca610a0df))
- **boolean-attribute**
  - formdata value handling based on choicetype, checkbox and toggle can not be null ([3e4a4b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3e4a4b9611cb1fd54e6e184df1a50aa4acf9d642))
  - boolean attribute can never be a choice attribute ([9176e6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9176e64f53cd741b8b07229df75efead0685e4f8))
  - make selected value string to make it possible to select the correct option ([7c29a6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7c29a6325cfcc7a01facc0d3b02d2bb63c9d3c1c), [46d3c7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/46d3c773adf56b91c53ad4ba40586954e814ed48))
- **change-password**
  - use mustChangePassword property in auth reducer to indicate if cancel should logout user ([2e94ea](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2e94ea74c3928c18e50ee2ad1455a26c27c7bab0))
- **dateutil**
  - add localization to DateTimeUtil ([1f20dc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1f20dc7c7c515faa5b8abe0e43d7dc5c7fff0639))
- **list-grouping**
  - render correct label on grouped lists ([f6f3b4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f6f3b476ad7c1a44eb496688a0fc1466b04ea812), [d88202](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d88202c3848384b35f98c703a4873c7cfb3f7db4), [a531a2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a531a2325aa88fbd36d3ef9b4e7d8950915555f3), [ad175d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ad175d649991f2f041046f0217832d494fd827de))
- **range-attribute**
  - render only one child when range has only one child visible ([0b3f0d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0b3f0d44a411d3cc7e103e01aa6990e3682a09aa))
  - retrieve attribute contribution for missing composite child ([1c9df0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1c9df06acb1d7497c3293a13405a1a73fb7a77c0))
  - update name and data-id of range children ([9ed6b4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9ed6b40fb86fa82a9636eab71d4c4f08cf5a6554))
- **diagrams**
  - make location of swim lane diagrams configurable - [BISU-6355](https://support.beinformed.com/browse/BISU-6355) ([74f08b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/74f08bc90ed429435a938536a773d5729f13ea20))
- **composite**
  - update readonly rendering of composites ([ed9122](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ed9122188e7202c0bc4c43ddd578d6d19363a08b), [dcf44f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dcf44f187a4b95164f632b565d029d5d45796e90))
- **parameter**
  - take encoded parameter values into account when creating parameters from string - [BISU-6362](https://support.beinformed.com/browse/BISU-6362) ([3fbeb5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3fbeb5b906a4574179d8e7ce68ed55e2f8cb080d), [8cb332](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8cb332533621055c4063f90b60819ed1dc70cac3))
- **attributes**
  - put server error handling on attribute, not the form object ([e0bbe8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e0bbe8fc7a2eb4d412b67f39541b6ee3f5c3af55))
- **download-link**
  - use span as download element to prevent anchors in anchors ([5a3508](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5a3508f918402b2e3bf407ccad7559c238bbf0d9))
- **user-menu**
  - render user information for external users when logged in - [BISU-6317](https://support.beinformed.com/browse/BISU-6317) ([6ffe74](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6ffe74ee6a8f763840be4abf3e8471a4db4a5262))
- **event-list**
  - no operations on eventdata that is null - [BISU-6345](https://support.beinformed.com/browse/BISU-6345) ([e53dba](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e53dbac98e6773d11fe9924165514819c6bfd91c))
- **assignmentfilter**
  - support assignmentfilter with context ([2a98b3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2a98b322570bd27c0692486ab048de6a0d1dd312))
- **theme-config**
  - move retrieval of theme config file to runtime to prevent cache problems ([f27e35](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f27e35546b59916db4b5ca98cb96eeee6d51cb93))
- **range-filter**
  - update change of range filter children ([ef515c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ef515c33a943efe5b274aefe371add4eb76f3d85))
- **i18n**
  - update ListDetailInstrumentResult.GivenAnswerTitle ([c15175](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c15175fd1b4286f1eead8923f75f500f32f34d75))
- **panelrenderer**
  - use href argument only when available ([6f34c2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6f34c272e32f7905474404c9a197b2cba9f736cc), [f095fc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f095fcf761c1d11f153e215b7ed7de12ad9b93c1))
- **boolean**
  - render readonly default label for yes / no when no alternative label present ([00ed0d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/00ed0d6626d917b991672eec4e61411f7ae5896b))
- **storybook**
  - fixed boolean attribute stories for compact layout ([b7c346](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b7c346d0494f4ef396243de739a7ed9594d11b6b))
  - fixed loading decorators after hot reload ([3c85ca](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3c85caf70239c9020a4f4e36d6ecee7c9e583dc9))
- **locales**
  - double single quotes only placeholder parts ([580162](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5801621a4cef97045cf58483997536dd39a3034a))
  - prevent two single quotes in locale messages ([ff9b42](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ff9b4259f0460bc7e84491703f429f6ebff1552c))
- **classification-result**
  - render classification results when no positive or negative config exists ([507355](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/507355f8bddb82e7b76c208f005572d886f68800))
- **error-popover**
  - error rendering of composite attributes and highlighting ([4afc26](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4afc268e2749436f5744b4cfdcd53732f575fffa), [a61434](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a61434db6d65ec9053a59c6c05cf194ba1dbfcca))
- **range-filters**
  - update of range filter children ([d014ad](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d014ad4c81d1488f7368b7e47e9883ac43b313cf))
- **label-attribute**
  - render label attribute on list details ([afb805](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/afb8055a79fb703d7458f20ea4c4a7acf08f549f))
- **timepicker**
  - only render time parts that are required for input format ([9d42a7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9d42a7a25a1ea5d2c868837e1b5d289d2940aa4d))
- **a11y**
  - update text color on hover on active list item ([e7aeb0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e7aeb0ac3969897a0e5ef66a8a68513e01ceaf3d))
- **href**
  - retrieve correct path when contextPath is part of a uri ([a2a4d1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a2a4d1e3edd3596bb677e56949a03e6e37820a46))
- **dependent-question**
  - hide attribute not available in dependent-question layout hint - [BISU-6294](https://support.beinformed.com/browse/BISU-6294) ([5b18f5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5b18f5434f43fb192addc44ae8100aba5ebd1fc6))
- **focus**
  - don't change position on focus, gives unexpected styling ([c3deb3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c3deb3387faac1facec7a911b78e07be13145a06))
- **readonly-choice**
  - render only selected values from server on readonly choice attribute - [BISU-6274](https://support.beinformed.com/browse/BISU-6274) ([69475a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/69475ad5430e9efa60f710721b117dded13bef1d))
- **choice-attribute**
  - render choicetype table on choice-attribute in readonly view ([660557](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/660557778594ebc679abffecb99547ba3e967ef4))
- **choice): fix(choice-table**
  - render global dynamic schema on choice attribute rendered as table - [BISU-6280](https://support.beinformed.com/browse/BISU-6280) ([ea4c29](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ea4c29890601a97746367d525e140d30c0ea8207))

### Style

- **list**
  - fix wrapping of list and footer ([210b78](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/210b786fdbb69fb8ab08c9a9ca15a7302b1d95f3))
- **lookup-list**
  - update classnames of lookup list ([267529](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/267529294cf02cee8e5bb1bf41f0febfbb8991c0))

### Documentation

- **storybook**
  - list and filter story improvements ([2dcd63](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2dcd63c0837f6acad145825e61bd486cd1fbc6f1))
  - chosen standard filter and chosen range filter stories ([269c47](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/269c47237b6cd177a39a6c61fe1bd7440b74609d))
  - added story for filters and refactor list stories ([416eb0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/416eb01028f61545b5ef5a5a462efb4910ecacc7))
  - fixed the theme for storybook for backoffice ([c0c6c2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c0c6c2f640868445413ec4d6ef04a8368a096701))
  - fixed listmodel import ([b35692](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b35692671722c9662c63ce277e049170766575d2))
  - eslint fixes for list ([791214](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7912149b12286f94d901cdec57dbf36a0b791fdb))
  - changed filtering of fonts in theme story ([455a76](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/455a76a0bb515bc290a28d5ec64441aa324c1067))
  - story for List component ([4b6c18](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4b6c18795504959670ec6bb4f8f25b11f4645554))
- **readme**
  - update readme with correct plaza links ([5b121c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5b121ca57628a7862cd29e2df22c3abfd99a8d24))

### Refactor

- **sonar**
  - fix simple sonar issues ([5fdeeb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5fdeeb90320dd9d5bf5980426dae9ff49764bb0c))
- **rangefilter**
  - set filter class on filter childs of range attribute for webdriver ([9eebc6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9eebc684ff8078505f59050c8960cf6420893e8e))
- **attribute-alignment**
  - rewrite alignment property ([57b30b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/57b30b8417de0296fef0cbfd122d5c6f7606f6e6))
- **datetime-attribute**
  - update default format constraint message ([79314a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/79314a955243a414a13cca642e9cae0b4062ed26))
  - datetime attribute has ms in iso format ([b2f064](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b2f064d2ed9e3db97f81017a0f8921cb6a81f116))
- **content-index**
  - fix typo ([2a8124](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2a81248a863e6da4bff637178a68145f8c4bcf52))
- **form-content-renderer**
  - fix typo ([834b3d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/834b3d104d4f2a751d764f98a5d21484d42298b8))
- **boolean-attribute**
  - boolean attribute with choicetype radio is not default compact ([fe2f64](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fe2f6467e6a7fe9b967320a5738df92046a9d18e))
- **client**
  - remove console.log ([bde966](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bde96693bac1d64b70b7058d3502b5091ae6fd29))
- **xhr**
  - set connection timeout to 5 minutes ([344a82](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/344a82870029764b3476b6ad7f74e54044d01797))
  - use responseType property to indicate json response, update response handlers ([dfa480](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dfa480839e9f6de2931d461d5fba97c19000eda8), [7ce45f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7ce45f31ab1d4df569859621a6c9c555c538ac75))
- **filters**
  - update handleSubmit method ([e372a3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e372a3d33a0bbd97666fd2a2123b55d56e770ac7))

### Tests

- **eslint**
  - disable react/no-multi-comp to give builder control over amount of components per file ([2875a2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2875a2bfd576d2c2ec5b9ea84c3e02d5f3c83272))
- **xhr**
  - retry fetch request when a networkexception occurred in an attempt to fix failing webdriver tests ([e8f723](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e8f723954b0a4d2ac0357135e9a38f7f40475b7b))
- **dropdown-link**
  - fix flowtype ([eaa744](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eaa744976718ef5f7955ece1154e83f5584dcb97))
- **number-input**
  - update test variation ([8a2d1a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8a2d1afe3dd5004e6b918e826511e61c7db8d350))
- **quality**
  - fixed quality check ([46f828](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/46f8281f7342c13a3229237de7f496f99fb1ee05))
- **rangefiter**
  - replace filter css class on range child with range-child to give better handles to webdriver test ([dd3e89](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dd3e89f3b4b7e070f3adb4d9b8a2edf863f0b725))
- **datetime-constraint**
  - update defaultMessage ([b61526](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b615264b60b6edaf39613590f1eee5c240a537bd), [c818ac](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c818ac93e4750fa19a99f3aecaddc8a24303bba3))
- **flow**
  - update date attribute model to datetime attribute model ([f5d0f7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f5d0f76dcca3ce11b530243ceacc4926c410a760))
- **action**
  - update flowtypes on forwardRef ([dae357](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/dae3579e8d8bca8730cc7b977d6304b125723f9f))
- **storybook**
  - add stories for date ([cc5444](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cc5444cdd86d0c7109a9d5a58c51510152c50ce7))
  - add daterange, timerange and timestamprange attributes readonly variants ([c3b9dc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c3b9dce4bc1d3c8f52f5f87ccefc3d529917a5c7))
  - add daterange, timerange and timestamprange attributes ([5fb92d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5fb92d018dc757783ac9314c87e3b9979eab8730))
  - add date, time and timestamp attributes ([db53ef](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/db53ef81f0b24bc86c0ec7164bc07b1d7681a983))
  - update story-loader and react-docgen for flowtype props ([28833f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/28833ffc55709e52610bb57734faf3b9df66d653))
  - theme settings ([9757eb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9757eb7ff3c5ec80828a5c2d71f787861f4dddc6), [530df8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/530df8c210ef8d8cc2265f76d17acf3fa67469b5))
  - general structure ([c76ae4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c76ae418e13a217f1dcddd8fc4a9f88f7adc9d94))
  - update base theme colors ([4b2c62](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4b2c62a11b66d0c54202115dcd31b3134c955e9a))
  - update layout hints on all components ([2fb4cd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2fb4cdceb31c05c3e4f45bb2e6ee3393178702eb))
  - add theme stories ([5953a6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5953a62e155df6a96c0670bb31b2e63127e15b12))
  - add readonly to stories ([691bf5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/691bf5cdc433f4069dafe54be25eab89cce26e8f))
- **number-attribute**
  - extra asserts on number format ([23ab21](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/23ab21bb1085bfa343cc2c3c622e7bd4ad00cac3))
- **models**
  - fix equality check on child models ([e68e29](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e68e29fa54373068a122b44f91e51c04de031229))

### Build

- **webpack**
  - optimize webpack build for graaljs ([e22e0e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e22e0e4998747d1971e9aaf254835b4d8f27c31a))
  - set devtool to false ([e7ba5c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e7ba5cff4844890cf598514ecbcef0f71e10a65b))
- **versioning**
  - use ~ for version range which includes bugfixes ([2580bb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2580bb2df78def3ff2ad43e7613fcc4b3b2879b0))
- **babel**
  - improve size of generated bundle ([6367b6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6367b67f53d9a5213bd05e0e693fde8db1496533))
  - upgrade to babel 7.8.0 ([ec2fe7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ec2fe710e55ab5b010334c7d69dc2843528e2d30))
- **dependencies**
  - upgrade styled-components to 5.0.0 ([0ad406](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0ad4064c7c66ceb67466eab01f400b9aaa0121d5))
  - update dependencies to latest ([254781](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/25478115f0d5dd0fc3fb1ee048e1578726b9b2ff), [aab03f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aab03fa21cf2972306e232896bb7cfb1169b6aa1))
  - update frontend-maven-plugin to latest ([1df1a8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1df1a8d9bbe850b7774768e87e00e114b9ad5f71))
  - update node and yarn versions for maven ([bd0e95](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bd0e95c589a6b7fc344871c8d9cf96f0d09c5d43))
  - upgrade storybook to 5.3.1 ([bd7267](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bd7267d6fe6aeab7231ceae1a37b81c0c5bdbbad))
- **eslint**
  - disable autofix on commit to prevent unexpected fixes on react-hooks/exhaustive-deps ([982044](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/982044db0ae03afa1614a521bed5e64bb75bd122))
- **license-check**
  - exclude storybook-chromatic@2.2.2 from license as it is not unknown but mit ([e5b692](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e5b69203f906e45cfea659e6b10b26fd1f0f775c))
- **pom.xml**
  - update nodejs and yarn in pom.xml ([c56b0b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c56b0b38cc1bed7cdde5800341d47c2cb711607d))
- **version**
  - set Be Informed version to 20.0.0 ([0169bf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0169bfbb9e07509fef20ced8b29187c8f7a823f4))
- **licenses**
  - allow w3c license ([1a543d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1a543da39b2c891940cbcc819e7d576958f1f93f))

## 19.2.0 (2019-10-10)

### Features

- **a11y**
  - disable focus box-shadow on tabindex -1 ([d13d0b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d13d0b70bdb79ba05f7b648c521695922ebe452c))
  - update focus on radio and checkbox and error popover ([5ef5d3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5ef5d3883d9f8387f8ebd162d5d37da808c18466))
  - use div not label on filters with multiple attributes ([e78cc4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e78cc4dc96f47ec1db2875aebd885be290418301))
- **favicon**
  - move favicon to separate component ([818b84](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/818b84e4a564ec1f53d6c84dc039f353fb643c52), [c33cc8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c33cc85a4a607346901c17fbf54eebf4767f8ab2))
- **hide-label**
  - update layout hint configuration ([a94714](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a947145c25daed38b306b3a1855459313c4e73eb))
- **repeating-attributeset**
  - split repeating attributeset into multiple components for better customization ([666832](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6668327ba2fc949168a30b0aed50fed5808404c1))
- **focus-outline**
  - set focus outline using box-shadow, for better a11y ([1e2213](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1e2213493b82a67c0835c9237220a5ea39f651bc), [f4057a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f4057a2277411e9016b0d6097280d3105f2852d5))
- **attribute-list**
  - add emptyValue property ([fdedf1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fdedf1874dbe44f7d79cff43fca457141c7827a1))
- **dropdown**
  - add max-height and scrollbar to dropdown children for better usability ([34fc44](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/34fc44806797774d2fd551cecc99a10fcf91e068))
  - make dropdown component accessible ([28e0b7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/28e0b76abd30e25a949eb68e3b219d3ec544bb30))
- **sort-options**
  - add layout hint sort-options to be able to sort choice attribute options alphabetically ([08ce8c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/08ce8cefea7db761c9e67427dfacf7c9cb32d62a))
- **listitem**
  - move list item title to separate component ([a12a5d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a12a5de9dc284900f96fd09a53e287292f512698))
- **readonly-attribute**
  - remove assistant from readonly value, set default direction to vertical ([e98795](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e9879507dd20e7043d1dbb6200db7dc97fdde8d4))
- **preferences connector**
  - added feature to accept string or array of strings ([904671](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/904671b14d80258e77ab16afd20cac382362f6d1))
- **lists**
  - move base functionality of list items to separate view component ([22b926](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/22b926ead85d849ae77bd02c97fdebd32571c5bb))
- **label**
  - add isOptional and isMandatory i18n ([649b4c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/649b4c54c2c3eaae7ed55fac78a1cf1e7db8e514))
- **formlabel**
  - add setting for mandatory and optional sign, add separate components for sign ([567238](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/567238f20f2fe0c339c74bc70ac55bd0ec76afb6), [5ab335](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5ab3354e8eebb28b74d84ab7acd2e356ff429191))
- **table**
  - better accessibility on table view ([e7834b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e7834bfbc3473284ef30146e57db5c403493c38b))
- **attributes**
  - skip attributes that don't have a proper contributions ([0cb47f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0cb47fe8481b639e9815b8c23cb56cda7c35bbfe))
- **datetimepicker**
  - make datetimepicker component more accessibly with keyboard ([bf9970](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bf9970f8ebc4883f31e4e2d6d8f3144036b27e62))
- **flowtype**
  - update flowtypes of connected redux components ([7ca88c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7ca88c7c926335f5da42266092b1cd40c9ada921))
  - make objects exact type for stricter checking of react props ([5a54be](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5a54bef40c5babb92836e4b70232d75830e3c7ec))
- **popover**
  - add descriptive text for better a11y ([78e762](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/78e762dc59f39f1911cbc7a841940b890f4c6745))
  - set correct style on popover elements ([1f3391](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1f339195df2a21c61ca00a5093aba4646f5c9bda), [6e7c0c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6e7c0c107a2532b6e0c5e29456050f23b5f44537))
- **paging**
  - only render paging when enabled ([61cce0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/61cce054591117af61e3f2056770ebaa697cbc39))
- **process-status**
  - add state and canComplete settings to processStatus ([2fea49](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2fea496f0120da8e74f103a22114a9909ce43874))
  - add processStatus settings to links ([9710ab](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9710abc8e903dcca66a6cb69508184e5ee050312))
- **i18n**
  - replace withMessage hoc usage with useMessage hook ([4d7d2b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4d7d2b8a7f0be22dc30551fc257caaa0d44d4d81))
  - update product error messages ([868deb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/868deb3ee22c2c2d888878aed8a6db04639616e7))
- **errorhandling**
  - use custom exceptions for better error context ([5695b9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5695b9a7591483d6dafb4b06f7b93a8c2c4838b6))
- **errorresponse**
  - add indication for timeout error ([2ba639](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2ba6394a10f74151991287df1a1c78e8f05d6481))
- **formroute**
  - redirect forms to the modal route on deep links to respect RENDER_FORMS_IN_MODAL setting ([c249f9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c249f9114028960c3f14e23bb962eb24aece871c), [86ea51](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/86ea51fe2f0d634e7ff4211bd9c291ba50b3b4a3))
- **notify**
  - removed specific notify hints, these are replaced with notify and patched in be informed ([a6249b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a6249bb0ad51dcd3a1619e0e45167b8f203ab0be))
- **error-response**
  - add isConcurrentError property on ErrorResponse to indicate concurrency errors ([213fd3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/213fd3870f06e00730ac0aed8adf7ebd970bcb79))
- **button**
  - set dotted focus border on link buttons ([747cb1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/747cb148b817a505e7ec34f8c2fc1d5e8cf04b06))
- **closebutton**
  - make icon customizable through props ([981c32](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/981c3245e966e8842cd73d71f06c84ec58bfe610))
- **notification**
  - put notification view in separate view components for better customization ([f439ae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f439aeb6b0be6e17b2c19229d7a216e4899d07a8))
- **formmodel**
  - use layout hints delete, update and create to indicate action type on form ([ddc5be](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ddc5be7120baf6a474a73d7e5ffb7d8ee83b31e5))
  - add actiontype property to the FormModel which represents type of action ([7b37c7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7b37c733fd18d11fb02116336c45abaeb4f69e31))
- **actionmodel**
  - add update and create hint to be able to mark forms as update or create form ([bd2782](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bd2782fe0c3a46cce4273d375a0dc18c8c4e30d8), [de9433](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/de94338c12745056dadf96fe108b90cc0a31892d))
  - add delete hint to be able to mark forms as delete form ([0b0126](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0b0126bff92f8162b358975f4d7449f1f73b1762))
- **modal**
  - separate modal background and content into separate view components ([26d30d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/26d30d34aab5c2d279d6fa7fc1992a49897ee6b9))
- **confirm-dialog**
  - add confirm layout hint to show a confirmation dialog on forms without event questions ([aed873](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aed87331f0fe380d86fe2783888e25c99ac3fd0d))

### Bug fixes

- **contentbody**
  - enable clicks for external links ([f61c40](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f61c4090d353fb18a8fc2d32ae7fbc5276fd06aa))
- **signin**
  - update translation on language change ([edfc66](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/edfc66485f6a9ddb705d08a40d263fd30ae5715f))
- **timerange**
  - no range validation on time range attribute ([60518b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/60518b4ef5c3472f6d56a976be9cf55e50274c1c))
- **time-attribute**
  - cope with wrong iso format in modular ui service ([7adeca](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7adeca9471585f7a2888102a71724b0d1e1e2c61))
- **focus-trap**
  - keep focus inside the modal and date picker on keyboard navigation, return to correct element on close ([1453ee](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1453ee5a3aa3c729bf3197355c002754f5fa5caa))
- **lookup**
  - only use styled version of dropdownchildren on lookup options attribute ([e1cb2e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e1cb2eeba0b98e188f1a425ea5b3faf56cd932ba), [7dacc2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7dacc217f395c0d65d45fa56c101f29718406ee0))
  - encode lookup filter ([b6e480](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b6e480db5ae71500a33698f692d02ad35405b85e))
  - marking of found text in lookup result is not regex safe - [BISU-6271](https://support.beinformed.com/browse/BISU-6271) ([f16ee4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f16ee4beff55b8d311de9d1423e207f52c14e382))
  - indicate isLookup on table rows for backoffice ui ([f2a9f3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f2a9f316861be5ad3110ff7846d78938e7fc4ef6))
- **numberattribute**
  - add placeholder getter to model ([25cc37](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/25cc377a00e883a00d7e8134c6df088ced8b1293))
- **choiceattribute**
  - render configured placeholder when available ([06d75b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/06d75b2253620ceebdef7c8524e3b1c7d578acbf))
  - improved accessibility ([720791](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/72079124f618297b4ef0adbd3c5a03f2c334e536))
- **list**
  - set correct order of list views based on settings ([73a9b3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/73a9b38419e4750a07dd76f7a266a4d76886210f))
- **encoding**
  - move parameter encoding the the Href model to prevent duplicate encoding - [BISU-6281](https://support.beinformed.com/browse/BISU-6281) ([a6c23b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a6c23bba1d0d750e4b4df19f94728e10ecd9e48f))
- **settings**
  - use enabled_locales setting to render available locales ([d7c987](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d7c987d357ca2fa585583847b3834a37e2e211a9), [aea58c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aea58c2a8b97d2531df6ca7650bc4fb3d91d30e0))
- **mandatory-attribute**
  - mandatory hint was overwritten on dynamic validations ([65a03b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/65a03bc31a438931a0a4f12595740e52b69f5462))
- **basefiltermodel**
  - update isValid method for filters without attributes ([e6416a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e6416a5ec8a1069b9609d62cedead250ad81da72))
  - filter without attribute is never active ([a78375](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a7837551a4c336295bdafb2155eed4a1374c2189))
- **build**
  - added default value for renderAsLink prop ([990553](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/990553f0c562106544a37c53aca77282b8e79dbf))
- **filters**
  - filters should not submit when one of the filters is not valid - [BIPD-10128](https://support.beinformed.com/browse/BIPD-10128) ([7edb2d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7edb2d064c2175e6183d086a2e0feee134668546))
  - encode input on filters - [BISU-6275](https://support.beinformed.com/browse/BISU-6275) ([d68f5c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d68f5cc1a2041177829bba54ea60264cc569e418))
- **dateattribute**
  - render correct format on server error ([7baec3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7baec3ff0963a38cef75fc89d6087e6761451eaf))
- **memoattribute**
  - add onblur validation on memo attributes - [BISU-6254](https://support.beinformed.com/browse/BISU-6254) ([d042e6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d042e6f7c392a43060fcafbad5a3c4ae1855e623))
  - set placeholder from attribute ([e7bc35](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e7bc351fed1407031c4cf27d0cec7a1477cdfcb3))
- **vscode**
  - added vscode ide configuration ([16c1b0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/16c1b0187f41bdf31744dcc35982582e9f57a57e))
- **assignmentfilter**
  - fix lookup attribute in assignment filter ([57d864](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/57d864ffae2159d48b62486d3c713351a7db15e2))
- **button**
  - fix sortchooser view component ([edcc7d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/edcc7d0415e48f32099051ed002424c339e8a2f8))
  - fix asBlock property ([a1cbef](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a1cbef8fd0e6178888c34e6c71a0a5439bcd501e))
- **paging**
  - render Paging component with previous / next buttons, when total count is disabled - [BISU-6245](https://support.beinformed.com/browse/BISU-6245) ([9bb247](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9bb247da0c3dc5f74cfe60137f099c7f5d04bcd3), [24b364](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/24b364e6512b3fbfb45a860c74f910a19f39c743), [f6f5ae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f6f5ae9375d6e87882cf3e6ec5dff2ddb81041ba))
- **dropdown**
  - hide dropdown children when dropdown button is clicked ([2545c0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2545c0cda1fa1e721add575bf5280cffaaf4fa85))
- **formbody**
  - set showformerrors initial on true ([e67370](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e67370fac823f5c6b88725c24593f690d9f1fb36))
- **stringattribute**
  - use correct key for regexp validation message ([8faf48](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8faf48d39d19edfd01ea577f2ec6c6b01303f277))
- **assistant**
  - render correct attribute assistant message ([df500a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/df500aa78a53fa4b711e5bbeee99fd42f9402446))
- **composite**
  - render composite attribute with composite children ([496638](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/496638e3c9a4a741a64f90ee25523cf565876fa6))
- **datepicker**
  - prevent selection of dates before mindate or after maxdate of a date attribute - [BISU-6213](https://support.beinformed.com/browse/BISU-6213) ([466bfd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/466bfd8986473280ca9759e1d49284011eddbaee))
- **errors**
  - update rendering of serverside errors ([36c186](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/36c1861165ff3f8476439a2946a8ab5c67a68a5c))
- **attributes**
  - attributes without permissions should not be shown in detail panels - [BISU-6231](https://support.beinformed.com/browse/BISU-6231) ([859dbc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/859dbc42b4b657573b645dd42d5042ef901e26bd))
  - deeply nested composite attributes could not be found by attribute ([f9d0ef](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f9d0ef1221827f72d8ae768b1543fe07eb4d5f76))
- **dependent-questions**
  - add lookup attribute as dependent attribute - [BIPD-10060](https://support.beinformed.com/browse/BIPD-10060) ([9379ce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9379ce872698d465ff56dce4e931325cdaf4b1c9))
- **validations**
  - don't render disabled submit button when clientside validation is disabled - [BIPD-10055](https://support.beinformed.com/browse/BIPD-10055) ([db28eb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/db28eb7a97d2e91d4ffdd0838f673bb60a5e766e))
  - respect USE_CLIENTSIDE_VALIDATION setting on mandatory attributes - [BIPD-10055](https://support.beinformed.com/browse/BIPD-10055) ([b19196](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b19196dd9e6a1893404e26756dc73565ea9c5c68))
- **validation**
  - check for USE_INSTANT_SERVER_VALIDATION on first request of a form - [BIPD-10055](https://support.beinformed.com/browse/BIPD-10055) ([da73d0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/da73d0db9d20d9c19b044350c932ba5dc33e44aa))
- **theme**
  - prevent request of theme file when the theme location is not set - [BIPD-10073](https://support.beinformed.com/browse/BIPD-10073) ([9a96d5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9a96d570dd0ec3950d4eb74ed33e93c21999cd29))
- **layouthint**
  - make notify hints also available on forms ([9be39a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9be39a2a0796d3e727506a79d61b5bf2c1642f3c))
- **datetimepicker**
  - fix error on ref usage ([e7ad2c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e7ad2c767d18b2f5b4b0e7fab55aca754b1e7111))

### Refactor

- **repeatable-attributeset**
  - update className for customization ([2cceb9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2cceb94bf82e877f4133cffc48a9c3d36406cacc))
- **sonarjs**
  - move isSelectable before usage ([08d00d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/08d00db5a091b5b241a589fb5e688fea41e5eb01))
- **lists**
  - remove rounded corner on first list item of base item ([79edad](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/79edadfb05c0a74e80b99c532fa4632832c197ad))
  - sync backoffice view components with general layout ([52dd15](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/52dd15e695fae13504b7922d2db605d988d5fdf0))
- **a11y**
  - choice attribute, use correct label element ([d5ce4e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d5ce4ea3d9159fe043c54488c2f21790cedae3c3))
- **detailpanel**
  - remove istab property ([5f6bfc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5f6bfc2928adee7f0407800af0127fde35f7026c), [88e467](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/88e467e6835327dea90144cd6e86267ca77c10eb))
- **popover**
  - set correct flowtype ([6c6d40](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6c6d40985667f1f9de958fc301944e5d6d352bda))
- **components**
  - rewrite class component to functional components for better readability and performance ([f7b059](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f7b059b2bc76f8efa2b6d3e6d3319e1a1d602e16))
- **error-notification**
  - rename Error folder to Errorpage, move ErrorNotification to separate folder ([d3ca0e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d3ca0efe0dfc7873625ebc6c20aa2bcd1b6c0fa2))
- **form-action**
  - remove handleFormFinish action which is not used ([c3a3b8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c3a3b875de7d134bc00b3d451660c3188e01e8b0))

### Tests

- **listitem-title**
  - bring back listitem-value classname for webdriver test ([2f218b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2f218bb8cc908d5279ae7f90b63be03a6fe8e2ce))
- **filters**
  - fix unittest on escaped querystring ([c69eae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c69eaebf1f60874a9a4453db139a831c2634cc1c), [69e529](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/69e529be7766a9cddbd6fc6d84d38f21e8f0d397))

### Build

- **dist_folder**
  - fix emptying of dist folder ([f45e11](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f45e11dc9fce8693f1d6396ac7882d68cd68a8bd))
- **license-check**
  - fix license-check ([35c84e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/35c84e9c39dfbaa2597de09c5f0bd28e879605a3))
- **pom.xml**
  - add cache clean to jenkins and quality build ([d84782](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d84782de6f16ba13546d09eff3f598241d1a68fb))
- **jest**
  - fix jest configuration ([2a9210](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2a9210d9297e4346ac7838f0af14a0657bc28e62), [33481d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/33481de34b7dc4483ebec71d25b6cb9a9f210d00))
- **lint-staged**
  - update config file ([03b9be](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/03b9beb7c3cb96b88b1dd2811a487392d4d2b901), [2a8068](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2a80689fbcc52aa10edf682ae5820bc57c577d7b))
- **eslint-loader**
  - re-enable eslint loader in webpack config ([d3b286](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d3b286f36fe0b4eae51f292026d029bbcc94f0dd))
- **maven**
  - update frontend-maven-plugin to v1.7.6 ([a52f09](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a52f09833a69fdfba4ee12869b825d767e1c6702))
- **manifest**
  - update manifest and create jar node scripts added ([9fe13c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9fe13cff0f1a71a98e72d6a0f1085280328cc9ac))
- **webpack**
  - use commonjs imports, make build-builder step unnecessary ([a1efd7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a1efd79bee0c5cd1efd33167f72e9fe9de485130))

## 19.1.0 (2019-06-20)

### Features

- **loader**
  - add server loading indicator on minimal ssr ([3dc8bd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3dc8bd76601abfe9fc0207bc9c8cbe142db8f62c))
- **nashorn**
  - minimal babel polyfill ([4435f5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4435f5508d8a7df300f3a88a83c419317b431111))
  - set correct config file path ([11a926](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/11a9261549086d1f87c1ea343a6dc070f91aa121))
  - update polyfills ([c997ff](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c997ffd2b15f23cac196ea2d2bb20c0414a82159), [86d6d9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/86d6d90a1331c464cd5fefb15bfe1a320bec7ad6), [c34f49](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c34f49014a7af2b597e283e314da1985bd8d9f5a), [755da6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/755da68047abea3e4bf49c1535a4798a644c9ba7))
- **speed**
  - various improvements to make ux more responsive to interactions ([7eb334](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7eb334089b0a33dee6d2a814b8d6940ecce85644))
- **form-submit**
  - prevent form submission when form already submitting ([482f89](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/482f8968870203845dfdd3ff9fe3fd3401b9525e))
- **theme**
  - show available theme properties and settings ([1751ce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1751ce022d508b931bb888051fc9a97df0648762))
  - update theme utility methods ([78ef57](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/78ef57aa299e03e1bc5865bdf07a9958a5995a2f))
  - more robust getContrastYIQ method for readable text ([798983](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7989832901c211634ed170ea01679efcfb3a1e49))
  - read configurable theme file on server ([024660](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0246604c08ba0ca04076e53485f713077e3ae254))
  - create theme on client and server instantiation ([203332](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/203332b491499a51267aa1ffc276ad2105a29ccf))
  - make it possible to use an external config file for theming ([56a014](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/56a014e07f7f854c21e0cb95b0126c0c5b22d7c4))
- **settings**
  - add settings programmatically and through layout configuration ([ff1fc3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ff1fc3ea567846488e2cc1b6a648573531405eb3))
- **stylelint**
  - add stylelint-a11y rules for better accesibility ([a3a1cc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a3a1cc69d5ed7a47dc03567e71783c8f4d953e57))
- **autosubmit**
  - make it possible to force an autosubmit through an option ([30a192](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/30a192372adae29045cb52933ba529859fe1e594))
  - make autosave and autosubmit configurable through properties ([f4a75d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f4a75dc06178b7519e00e25bbdc4e43c4c44b66a))
- **formlabel**
  - make the size of the form label column configurable with a property ([da350d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/da350dc07d01019f534892d0c42a1b2726a50b70))
- **popover**
  - better theming capabilities of the popover component ([a0e8f3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a0e8f3029e147b724c52736f24c1c0124cc5eb82), [5db9a6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5db9a6206954ae67783800630318672ea14b66fc), [059a57](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/059a5779b3262c60a91cb073c271829419774bb8))
- **login**
  - render changed username warning ([176a6c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/176a6c253fe25d8f32ae478dea7e5cee964ed9bb))
- **modularui**
  - send locale also on data and lookup components ([6ab94c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6ab94cc4c17b9be8b5841cc73de507f641aa1d9c))
- **webpack**
  - add simple webpack watch script ([3087c7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3087c780d1d15f8ff76e72f7a9eace0d2902b40f))
- **groupingpanel**
  - map GroupingPanelModel to CaseTabGroupingPanel ([1f9118](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1f9118054ee0cc6cbe9d4b5822161bff6febc3c7))

### Bug fixes

- **properties-panel**
  - set correct resource type for case properties panel - [BIPD-9846](https://support.beinformed.com/browse/BIPD-9846) ([235fb3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/235fb38d178b616378c0a32b78b42b1e6b1383d1))
- **lookup-list**
  - lists can be marked as lookup which prevents rendering items with links - [BIPD-10017](https://support.beinformed.com/browse/BIPD-10017) ([931486](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9314867d52f4c4dd004d60c31e56d19bf9efa1d2))
- **instruments**
  - only retrieve concepts for choice attributes when content is configured ([4b5f38](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4b5f38564f1c1f8be388aa706c2555b1332ecc94))
- **choice-attribute**
  - no placeholder when choice is readonly and has no selected value - [BIPD-9844](https://support.beinformed.com/browse/BIPD-9844) ([3d68d1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3d68d162f1f68da5edb9d39d15dddf388ed261b0))
  - render server error messages and assistant on readonly attributes - [BIPD-9844](https://support.beinformed.com/browse/BIPD-9844) ([4ade1b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4ade1be76526f53db784efb533f1eefbc9773212))
- **i18n**
  - escape quotes in messages ([435054](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4350547363f8c0b24f5ee6d6128a07a141f84918))
- **inline-edit**
  - update removal of create row ([63edd4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/63edd4064461a1e4a57d73a9a3f9bf701f95ca7a))
  - render error message on blur and remove on focus ([893503](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/893503a6513588b97a791cdb93f9ad27214c555b))
  - lists without update actions should still render creat buttons ([be9a59](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/be9a59e01094ca1be9e1148e85074f46284e4900))
- **modularui**
  - shallow compare own properties on modularui connector ([88ae46](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/88ae46bdf2e954647b5d20e96be3318cfe7af89d))
  - initial state is null or undefined ([d83bee](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d83bee5f797a0a3c5626b6e792360655ee1db280))
  - always load model on initial request - [BISU-6186](https://support.beinformed.com/browse/BISU-6186) ([7b14a2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7b14a22078e3abe9e953861df6bdbe0111edf38a))
- **chosenfilters**
  - don't check for shouldcomponentupdate, prevent refresh of chosen filters ([7c6b51](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7c6b514cea854c1c7ee6dc65ed6e08e6a2cebde8))
- **filters**
  - don't do paging on lists without paging when filtering - [BIPD-10009](https://support.beinformed.com/browse/BIPD-10009) ([a7e6e6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a7e6e6e7c805199757f05c19aaa8ec493a30f412), [931fab](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/931fabb36fd98c14c0a44f19e73437f0b9cd6d1d))
- **errormessage**
  - update rendering of parameters on error message ([c4deba](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c4deba8c053e00b2b771f03aff5d56a8c2e4472f))
- **tooltip**
  - make tooltip wrapper inline block for correct placement of tooltip ([39ccec](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/39ccec900cdfc129ff52dcbd5d58dffe3aa6ab95))
- **autosubmit**
  - go back in form when autosubmitting an attribute ([ee9d8f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ee9d8f137d13f9b78d7ec52673ebf414982a301d))
- **react-router-link**
  - put existing state of the href to navigate to into the location state ([b634be](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b634bef04a46b0f3a255d56ba941a714d70ae683))
- **formtitle**
  - missing semicolon on css gave a wrong font size on the form title ([c598e5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c598e5dc766c362b109043224694c0d0da05494a))
- **formmodel**
  - use addParameter method to add parameters to the selfhref ([78f031](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/78f0313fcb78d58c4f01effd3cc3116915c966ba))
- **mandatory constraint**
  - make null or undefined count as an empty value, thus fails the mandatory check ([8008f1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8008f15d9e6f92c7d02d7b0ebae2a2d2529092e4))
- **panelrenderer**
  - exact match on panel renderer connector should check for href ([f19302](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f19302c04ce7ecd6bd03e5f77eb563f8514da071))
- **listitem**
  - use panel links for additional detail route - [BIPD-10028](https://support.beinformed.com/browse/BIPD-10028) ([8c25a6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8c25a6af5d22b67dd15b4ff5ad52bcc5e42d7745))
- **ie11**
  - add correct polyfills for ie11 with styled-components ([ed5adf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ed5adfc5e958e8ecfa3aabeeed9656c83e6f77ba))
- **error**
  - use Error.captureStackTrace only on v8 ([c1abf7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c1abf77f13d449ec6feecd6ae7fba3582d46957f))

### Style

- **prettier**
  - run prettier on files ([536446](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/536446a944b73c079ab0886047dd43dd5b4b6335))
  - run prettier ([ddaec6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ddaec650c9a107fb476ab5fc69a7723c17780151))
  - run prettier over layout ([c32337](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c323370afbb1b26dcedf2be882de60d6d23ef9c6))
- **flow**
  - add Href as allowed argument for linkmodel.create ([2a4628](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2a462808e3521d97679c6149c13f439fd86de2e4))
- **sonar**
  - make sure global **webpack_public_path** is not checked ([7f1b88](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7f1b8890c6f356027a27344b45286dd31b487f41))
- **eslint-disable**
  - fix disabled lint notifications ([71ccf9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/71ccf92ff58a6971047e370a0a10d86e04705b13))

### Refactor

- **flowtype**
  - fix problem with array.flat ([db77e4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/db77e4b2b7a7770490f95bd22f5ad1e3d4ef34c6), [3ba826](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3ba826aa1f76c892afdfcb9fbbaa8955278babf9))
- **theme**
  - move default theme into separate folder ([7e337f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7e337fb1c7eaf7ba4fd09e37e785ba19f1b31908))
  - more performant argument substition in theme json ([b2ead4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b2ead4fb5f32ad0b918604c6d0236691e4321499))
- **server**
  - make server rendering more readable ([eedd43](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eedd4327594937c07f7fb53afffe28d10fb58b7b))
- **contextpath**
  - use correct path for **webpack_public_path** ([445564](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/44556479b750a9b4b6971be3f217ebe6ee4633d3))

### Tests

- **license-check**
  - update version of bundle ([9334c6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9334c6f149547ce10a9465ed6e3b28763f32caaa))
- **sonarjs**
  - fix sonarjs issue ([4c6e29](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4c6e29aac5c2a176e2003b0cb5f6d5b0855e4923))
  - fix two sonarjs issues ([1c2747](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1c2747bba2e491cd40e8d3234e7df53b56400129))
- **modularui**
  - update tests with changed status check ([88ee6d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/88ee6d9c17bec03bfb2e7370389619a469b1cbae))
- **xhr**
  - update rendering of json parse error ([280458](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/280458a21ce5274318a9f20c4b1022ebbab2246a))
- **mandatory constraint**
  - null or undefined no longer throws on mandatory check ([39a81b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/39a81b0904ada1a8cebdd8c66a4120ce0fb12058))
- **constraintmodel**
  - assert default message on initial model ([16398c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/16398ca114c66085ba3b6d353ca696f40d97cc41))

### Build

- **pom.xml**
  - update node and yarn version ([b9e579](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b9e579ffceb5628a90069b4dae3cff36dc49ebe6))
- **hmr**
  - fix warning message when not using hmr ([c518f0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c518f0e6f89dbbaa88444dd1d409c350729fe1a7))
  - remove react-hot-loader from babel config when not hmr ([15aac5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/15aac5902daee41a6f34f7af925a9e59059a3d78))
- **licenses**
  - check for disallowed licenses ([f8cc67](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f8cc67dbc03b22c873e7b4c6565bfa808346f9b6), [ab3fbd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ab3fbd3901ee8bfc0efb7f5ca53f733e1472caef))
- **jar**
  - copy correct manifest file ([d7babb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d7babb8f7d98c48162fb5fd1bafad1f9dffe2872))
- **webpack**
  - update server build of css files ([b4fdce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b4fdce7dcf489ce575478ee0478e32c9bdb93c49), [9f59e2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9f59e26c44dff2c3124de5f7fa954920888b9988))
  - make sure the dist folder (WEB-INF) exists before building ([11b3bf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/11b3bfff8b5df69a6bcbd8fc24b983930cf6a5b9))
  - rewrite build scripts to add hot module replacement ([1baf9c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1baf9ceaf8af45684ed776b347a0428407cdadcf))
- **jenkins**
  - let jenkins script also build a new jar file ([68fdaf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/68fdaf9cfe3ef55e9ab5f9f8e980547280dc075e))
- **happypack**
  - removed happypack from webpack build ([b079bc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b079bc40a991f58d539f4c312e360e2f0e9df5b4))

## 19.0.1 (2019-04-20)

### Bug fixes

- **groupingpanel**
  - keep list state of grouping panels ([057cd1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/057cd1edf054420d77033d11f437a8741c24b0fe))

## 19.0.0 (2019-04-17)

### Features

- **other**
  - render case tab grouping panel as an overview ([803257](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/803257359b38f58ecd4363bcb73dcb6bc132183e))
  - use new related concepts structure ([644dde](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/644ddeb3e58ae03729dc0c66ce9d58284ed8e46c))
  - add autosave option to updateFormAttribute action ([d0a3c8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d0a3c8e4b8c61b0ae41b04aa1d8f3a3d8ad7bf49))
  - add setting for enabled locales ([e50ddd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e50ddda538c1b953fb8b71a583ae08c8e4f3844a))
  - add node script to update manifest and set build config ([d8ffb0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d8ffb02867bf713587d364e3140c0fdba112390a))
  - add dependent-attribute: prefix on dependent attribute pattern ([275422](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/27542281582d1f367593858777fd5859ba01b33c))
  - rewrite of sorting model and sortchooser ([b15cc8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b15cc8bc09dc149580912ac3ddd311beecf9cb05), [6f73ab](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6f73abb19e500f3b3f97052465d5471b3aa98f70), [4fb990](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4fb990060d8f6a73d94ae40ef4ad96b61c53fa0a), [06d5a1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/06d5a12c3a96e92131778ff17f349713bf4d139b), [0b010c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0b010cfd5e043f398b75661b555aae25c6620914), [1b0acd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1b0acd606d39b7eccff45ba92d943fbd29075d7f), [fbfb2c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fbfb2c34382d5c858317542eba10ad0245ae13d1))
  - enable icon customization on forms ([2efd1f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2efd1f5f482ecba9dfe3ba890cb4b21cf71f64ba))
  - only load concept services on attr when content config is present ([7c453e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7c453e284a2524faf3d55d01037b098a45a637ff))
  - render content type icon on source references ([965484](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/965484f22abbb614f411051a6bba2628b9397079))
  - render noscript tag on server no ssr ([184d1c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/184d1cc5b6bfde8e87d24e313446051f0d4073d5))
  - use render in stead of hydrate when not using ssr ([aedb65](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aedb65a533d23830b6c400e48c6325a272ca4203))
  - advanced rendering of dropdown components ([a9df2f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a9df2f849cfe86cc2135171205abaac060094dbe))
  - add goto source reference to modelcatalog concepts ([62ddb7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/62ddb74fca2c767ef494acec6906d34b81a3028a))
  - validate time ranges. check if start time before end time ([bc8e4a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bc8e4a7f29ab07c849353ec81210568c4ef22ba7))
  - update source references renderin on model catalog ([1501e8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1501e84c39e84451fac74b86860948e8c74dc7ec))
  - separate datetime picker button for easier customization ([41bbcf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/41bbcf58c90bf53f30dd3a81aa8ed56294093743))
  - removed isHeader from ChoiceOptionLabel, it is inaccurate. use css ([e914cc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e914cced64eb84f3dc3d785ab8c2bd0cd91e2a61))
  - add getAttributeByAttribute method and equals on attributes ([ea1c5e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ea1c5e8a68133e369ef11f339071c3d3d0b5b978))
  - eslint - make beinformed parts more strict than the default ([048524](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/04852409b2d24a1e25cd7e18c57d8e13c57f8200))
  - add named capturing groups to regex for better readability ([f2dcd5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f2dcd575d9a90c09a65f54fcc74c04b524d18e18))
  - always a open complete process tasks in a modal ([f81d1f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f81d1f9f0748f1d55d00db10e107a6e13ca1b56d))
  - render descriptive information on fetch error ([a4601f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a4601f2a9c8af3f5bdec2b1fc7a04d32bce63782))
  - render server error responses ([ab40a2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ab40a2186e61b177fad4b48ff21f28fb8421223b))
  - highlight sections and combine same content sources on forms ([e3f3bf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e3f3bf33712f122dce8c91d5c8df790101d26c68))
  - add breadcrumb to modelcatalog ([9f04cd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9f04cddf83b9f73029815cffa0112d35de9c2fb1), [e53142](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e53142a369b3bda02046ca01503da44189c647d5))
  - rendering of subsections highlighted on question and results ([1ca422](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1ca4223ba624f0f05d18eb758845ffd74240747d), [3b8912](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3b8912c02ba58924e9a75584ee40c109ffeff864))
  - styling model overview selector ([1b5d12](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1b5d120561008693eacf8d46f07e3a8e0dfffee7))
  - redesign of model catalog ([38b97b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/38b97bfc0dbf936e9a6489b0ac2646ab059cd643), [889ecb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/889ecbb6c0dd55b3a3e01864e6b27e3ccffce526))
  - use external configuration file for model overviews ([cd2287](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cd22878c1378c866458cff2299e883ce6e89cb28))
  - always render question content behind a choice label ([6f228a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6f228a10e67600d73143eb2d06fa617eea128145))
  - render icons on modelcatalog links ([17be0a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/17be0affe7954f189adf9aefffc58a95af33306f), [f541c1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f541c1e6b00f3bd2b44fa114480cedad2a547fd1))
  - rewrite inline edit to be able to render server side validations ([af0ae6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/af0ae65232658bc31ade59a6ba0282c2c68349ac))
  - introduce keep-sidebar layouthint on grouping panels ([532cfd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/532cfd21278b102d463a940de381c412fd75f2e9))
  - render notification messages when application could be loaded ([d33d1b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d33d1b8ca39784a8aa08e06d8d008f1eb9b2b464))
  - generate a custom manifest for a build layout bundle ([ffc079](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ffc079ecfb4fe1db741f2e0fd607cbbcd4a87a17))
  - introduce preferences reducer for easy use of server preferences ([7d0277](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7d0277d66bc080cb70e0f97716e9800522b5f47f))
  - update rendering of instrument classification results ([19808b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/19808bf9fbd7e1587d739ba67d07d726cadeed5c))
  - make builder configurable for custom bundle name ([cc996b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cc996b265797e4c57bef6616d640391e1d2475cd))
  - make css url's relative to url, removes the publicPath requirement ([7a4da9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7a4da95a64d42ab31be4f3e95b87a38d6522368c))
  - update dependencies to latest ([7327eb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7327eb5dfcb9cbcd6bb6d915e7c2d63801467d77))
  - make progress indicator themeable ([20bb45](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/20bb45fcb24398de2a55a5b2bdf0e55e3765496f))
  - remove button:focus from reset browser styles ([87a2ae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/87a2ae662cf30d4dab29f3f0fe9575ccf83348b1))
  - separate global styling from global reset ([ea9a31](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ea9a31c62a4d09d8e7cc3d3be00557b796578fe3))
  - only render errors for visible attributes, fix dependent questions ([7292a3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7292a3e7bad8a89837c3d101a73dca28f40b21a1))
  - render generic notification message on layouthint notify ([878cca](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/878ccadf77bbf328be5877b6eeb17b1f61ab5d7b))
  - added theming for notifications ([65f64f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/65f64fc310ef73d3dc754054ca195eeb109016d9))
  - clean up layout hints that are no longer supported ([743411](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/743411b8d9afbcaac9ebe62cb475e71ee904eff8))
  - render attribute validation errors onBlur ([5e8746](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5e8746756911d87dae5a02877419c2fb3fd8c3ca))
  - set attributes mandatory when a form object is a dynamicObject ([4f1f81](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4f1f81bd7767eca3a841140ad3aadb70afd00054), [036b16](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/036b1667a7d1cd9189bfc977a27dd2addd92ae5f))
  - copy state when creating a new Href from an existing Href ([223c7b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/223c7b81b9a1832234f85a90b93ebff892c700ff))
  - open user menu links in a modal ([b67765](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b677650d2c21fd3dc233360e8ec47fc70f824188))
  - improvements for a11y ([12512c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/12512c46d6f556411379b22815f629279c7403c0), [129975](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/12997589c39abd8d1d7ad15f90d9d89f3cd0176a))
  - use local state for filter for better performance ([f8514d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f8514d992817da7dd746f0eaff285856c518daca))
  - add focus trap to modals to keep tab navigation inside modal ([c5e4b3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c5e4b3c4af9957f67a0f0a534a17a514d758aa44))
  - improvements for easier theming ([fc66b2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fc66b20128bbafca1ec2cdced5dd4ef14d55fb9e))
  - various improvements to styled components ([2f1e93](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2f1e93a273b20a73cc6076570b6362cdc37bac58))
  - add tooltip component and use it on the process icon ([501261](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/501261428449fd549b3e70cc5c442b9e35d65daf))
  - performance improvements ([623005](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/623005ce5314920e4f4949fe0ca7343ac3c31551))
  - use yiq formula to calculate button colors ([50987f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/50987f44907bdcb6e6e72678c38904760d6720f4))
  - rendering of process icons ([e0fe6c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e0fe6c7e5978d405afb06a3f86b449385e8f6a20))
  - rendering of disabled LinkButton's ([f9be20](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f9be2094ac2d5b4a6a202012599d26d4053939df))
  - add theme support to styled-components ([232198](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/232198deb0a76f20a37922e6a846a9270d48aafb))
  - render pause or lock icon based on applicability of action ([b82d36](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b82d363f251dd46c202bba12804d722b610e21be))
  - process based task group ([64064e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/64064ef7357c57c556ea76a3913126d292765ea6))
  - implement styled-components ([ffc35a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ffc35acb5b91d0687cd87b4a573c429bdec6e3ab))
  - prefix connected components with Connected ([cae70c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cae70c45dd1aed55c3c7b46d3d3dbc2b0ce3f37a))
  - render disabled links as span ([1b764b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1b764b60254e84819689ac380a82a04854631f84))
  - always send model to view component ([51c367](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/51c36710cc2784a65f72a8b5678c631170069c37))
  - add handleError and current locale ([a23e49](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a23e4927c6c584541d853a1025081b452f2ffad0))

### Bug fixes

- **other**
  - open forms on second page of list without modals ([b44f71](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b44f716781b1e3cd29aae7a15493dfb077b280ba))
  - update sanitizeHTML to use correct br tags ([a4be1c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a4be1ca8a2ff8d945c75ee8fc00284751afc47b9))
  - retrieve correct locale ([b22e9d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b22e9dafc9555c512ae086a7fa93cf265285b23e))
  - update circular dependency in component-registry ([bf5ef4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bf5ef48e7bf3ad32e9bc09bfe36b9dff80742f73))
  - set initial value of inline edit create task ([0c9b4a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0c9b4ab7a66ea91a09badb404f520d778b1c2eb4))
  - render concept label when configured on readonly attributes ([394800](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/39480019f6c16c8c4ab66f43410d671f03da21c9))
  - update immutability problem with filter collection update ([824350](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/82435008272e38d3de2bcd6611e8292f2a641cbc))
  - close lookup options when lookup list is opened ([ac7a8d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ac7a8d888757295128f7d753be5670c1fd444f3b))
  - format initial input number with correct separators ([d84656](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d84656b4252fcd28fa89afba46107948dc591a21))
  - questions that don't ask attributes, but immediately show results ([59f84a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/59f84abc8014ad3c2e2bab2cfc9eee8cd5b930da))
  - on ChangePassword form, logout user on cancel - [BIPD-9883](https://support.beinformed.com/browse/BIPD-9883) ([320dcf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/320dcfaf13560c8116f955500c03b399c25dec48))
  - add error handling to contributions processor ([6fd466](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6fd46612b9237f3e9c6abcd13a4e68022dadd5a1))
  - querystrings on lists with open details - [BIPD-9884](https://support.beinformed.com/browse/BIPD-9884) ([9640d8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9640d8943581a3f73352f544af1c9eaa77ac84a2))
  - render standard label on CaseViewButton when title is missing - [BIPD-9882](https://support.beinformed.com/browse/BIPD-9882) ([0a01d5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0a01d5e6b875a2c85705399b67a5b19f130a9ab9))
  - add lookupList configuration to inline edit lookup ([54f60b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/54f60bf739028d675acc162c6f44f3259d760ea0))
  - clear cache on logoff ([f1dedb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f1dedb065f5f0cb186cf43e7a11bdd98f71feb5c))
  - render related concepts on sub sections ([9ef216](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9ef216a1c5a75857e3fd7aaac81650cd47e0c0d7))
  - validate range / composite attributes also on root level ([a6991a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a6991a7c6eac24324bf14a22c0f421452f4bd2c7))
  - update import statements to prevent circular dependencies ([1038a9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1038a9797630e5d022aa91fc03ac38ef3fcd2845))
  - set size content icon ([2efbbd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2efbbdd3b6152bee9621cda97460b42962050626))
  - set correct active state to a navigation item ([cf5091](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cf5091154aec1d1c9ca9f7bab6214cf87ebe2b54))
  - on prev / next navigation, add non existing lookup options on merge ([247835](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2478352a4123a3511e1295d70968a6f22b4a5325))
  - problem on session timeout and navigating to modals ([b1a9a8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b1a9a8e8f038faff21b92305faecc1536a87bf4d))
  - content toc model for non searchable content ([df6274](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/df62748d997c9d7a8874447d0cc46e34c1dc8d2f))
  - rendering lookups on filters ([6b1f94](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6b1f948e52c1ffcda1dda282491896f8eb64d375))
  - don't set page on disabled paging list ([c12fe3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c12fe3739b76da5eaa438ecb6ce4d8e6f4def01f))
  - wrapping of text inside a popover with max width ([ff1aa4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ff1aa48a246e509742f38109df648162ddee0d12))
  - create after canceled clone action shows wrong attributes ([4c8aff](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4c8aff6aaf9f08f993fe12a573dfe0f1e55bbf11))
  - render content on questions, options and results ([0f1f03](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0f1f03febe419c47cd5736a5db0d423a5e687794))
  - set form not complete when navigating to previous object ([57264d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/57264d89614d93be9e2795e7b86542e0d29bf509))
  - create result and given answer information on list detail ([bcdb0b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bcdb0bf8db93105feacb8289545906667ea8ac18), [fcc0d6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fcc0d623a21312418f5edf1d561adb7b8c728a98))
  - rendering of custom icons on actions through a layout hint ([29077c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/29077c3ae9e5ea9ade8f12f76e08fc087bd12d99))
  - rendering of readonly formatted memo attributes ([eedb10](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eedb10b7d20666627056daaa8c0623cf45cdf08d))
  - set correct error state on password attributes ([be8d03](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/be8d0371a81f7bdedec340eb8c68781259494e96))
  - use current time for date time attributes i.c.w. datetimepicker ([4f95e5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4f95e5ec95c67f73d88a5921c634928ae393dc91))
  - update request for questions with dynamic validations ([5ab5d1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5ab5d1a8a75cd051bceca156420b40a3966ffee3))
  - send correct formdata for composite attributes ([a17f0d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a17f0da3e31acbda1792d7812cb6562b02a39772))
  - always showOptions when performing a lookup ([c1172c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c1172ca232e54de2ae90bd4e56e689a8490a659d))
  - run hasErrors method i.s.o. calling it as property ([24dbcb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/24dbcb17501cfbb4fc656a1b10496cc7bacb55f7))
  - dynamicschemaId on data ([ee064f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ee064f473be43f267ea1019af8e85fa29bf8859c), [3e2310](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3e2310f7d508f2c12333a864048e95f4dcb41cb7))
  - rendering toggle as button to prevent toggle on enter key ([898759](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/898759825364629b6715403042e275fa906f73db))
  - render empty list with hide-when-empty and actions ([21b0ae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/21b0ae6ffafe4fe1a7efc253e228e722501f08f4))
  - remove fixed content-type on upload ([094dd7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/094dd7e6d58223883a6f5b98fb93058a08b8c987))
  - sanitize html of wysiwyg input component to prevent <br> tags ([c6e827](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c6e82776ed86225ab4153c5951066e2ac3425401))
  - rendering of notify messages on forms ([94b99d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/94b99db142f45ef9160285c9f44f7dbb22f3bf11))
  - get error information for contributions error ([50fd56](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/50fd56289666fa124d0aa3f9d53b0b5ef4dc90a4))
  - wrap loadModularUI with dispatch method ([757e7d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/757e7d3c1494c261d9924e7ac259ae2fa9ee7485))
  - render taskgroups without an uri on caseview and groupingpanel ([acd517](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/acd51709fed7611a3c6fca287ac408b1496cb184))
  - make sure build jar can handle filenames with spaces ([50d3bd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/50d3bd35c022b73960bfbe37ddceafb1780c490f))
  - restore autosubmit argument on onAttributeChange property ([8c696d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8c696d07b39f27fe8b8da430a6ea7ec1e734ddbf))
  - render history event data when no questions available ([63e662](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/63e662e6288532f37755d7f79fca9815b78e7e8f))
  - readonly choice was incorrectly merged on prev / next navigation ([60c189](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/60c189cfa869b52dde36f1b67aeeb65caa9c8cc3))
  - only reload when a new reload prop is set to true ([634273](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/634273ab7bce809969a02e9d191d9f98b8b8243f))
  - unknown options are no longer added on update of form ([7846bc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7846bca8476017223bcb3182999ef2d982d9826b))
  - rendering of concept information on choice attribute ([273025](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/27302505ff35ce12bb3b552203786dbfa0fcbff6))
  - build was missing LayoutHintsConfig.json on production build ([d61604](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d61604ee8fce2cacdeb1b1f7c972533fca80ec24))
  - submit correct amount of repeating questions ([d309f5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d309f54d1a467ff04539ee228f4af35b6e56ad4e))
  - upload attribute with inline edit lists ([4420d0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4420d0b3cc1212d9b54949c73c78a9e1d370559d))
  - create inline edit table row ([6874bd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6874bd8b3c15edec8070303753850ebb02bb64db))
  - set correct decimal and groupingseparator ([60dae7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/60dae730811b4739654a01fded564b2d08497391))
  - make attribute selector specific for form ([fe00c9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fe00c99a4b0d855b1304e33849e1fd72786fd9e7))
  - fix validations on repeating objects without nr of repeats ([0b6c54](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0b6c54f399a979586a3bbe5466a1585b12079fe8), [564297](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/564297082111673c240121d29b4a674515a11bb7))
  - return correct absolute path on getPathFromString ([f0e241](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f0e2410efa4be69afde268673a3da0ced30b59b2), [d20daf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d20daf1d6c79450fe2655e4f9f562d653c72e35b))

### Style

- **other**
  - update flow typings ([14e8c0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/14e8c006f66683cad986b01ad3b7decabc37de5d))
  - update with prettier ([43c8c1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/43c8c130a260ebd9076cce273502faf813b39256))
  - update comment ([fa8378](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fa8378188284df994859e3573c64d203f0c58548))
  - update eslint and stylelint rules and fix recommendations ([9c06e5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9c06e5593cd75b5ef16348669b07a5be524d4de8))
  - fix sonar ([49c31c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/49c31cc15f61982dfb724ebde25e8297bbcdf39d))
  - remove unused eslint-disabled and enable unicorn lint rules ([9958da](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9958daa095b80666875089d679cb0034ea0dcb72))
  - increase max-lines lint rule to 350 ([a67972](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a67972068e95401bddcd4a50c75d484a62a7a487))
  - enable no-underscore-dangle to prevent usage of private fields ([a66dce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a66dce09e008ebcffcad6f562b4e61c83cd8477e))

### Documentation

- **other**
  - update readme.md ([892b37](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/892b37cb12524b3fa7264982f57b654ff2b717a3))

### Refactor

- **other**
  - pass down className to SignInView ([ec4b94](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ec4b9448b51eafbe3c87afc36b26dfa64dfcccab))
  - only update when values have changed ([c61684](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c616849e8cd98bf26bd52aa0c17bdccd43736132))
  - get correct modal condition ([598781](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/598781d3c86b18af310fc998c10f3b45fdcd0645))
  - separate SignIn component elements ([85b310](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/85b3106cb1d4140f4d58190060e47ba35506d486))
  - enable display-name rule for components and update components ([50e42e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/50e42e0143939d26e878c6ddd0d84f3fcbff299d))
  - rewrite modularui for better readability ([096dcb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/096dcb2975936a05bc8920fff322a1b17e58fd4d), [756d8b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/756d8b214a369b47faeeb2e4a6f4396c1bc16e57))
  - check if href is defined ([6b2657](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6b2657bfafe4a2c958d7e31cb0a6a873d7637783))
  - fix <pre /> font family ([cde220](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cde220020fac684315bf54054477b87e3bae1f8e))
  - split form content properties for easier cusomization ([095599](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/095599595fc2a726ea4a7a5793dc49dcca95b00b), [11112c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/11112cd5d98143384afd213cbb2f5d6d3f6a13b3))
  - update filters. set value to new list status ([5e5431](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5e5431f84d3ca08cd6033f46364b4225e8f0a074))
  - set correct showOptions property ([ef4f73](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ef4f73cf58062d116624769b24694cde90aef3cc))
  - make datepicker themeable ([bf59ab](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bf59abed9b4432726f86e79dc138dfa41fca9c2a))
  - add id to FetchError ([8e534f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8e534fb84551eb9b65884a590d84d4e0a9b03f20))
  - update server error messages file. better error notification ([9604f5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9604f520ec8a088ecf07dba808fca6fa5f3ff052), [8da3eb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8da3ebe5621dd5d6b0dea00380fd1183ba41727e), [74a3df](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/74a3dfc3c6f7bb3e85552985df8b186f32ac307a))
  - update Icon usage ([079902](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/07990290ad65f483faa2fab26e3caae2aea1fa0d))
  - rename clone to duplicate - inline edit ([4bd173](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4bd173d4df5d8228b578cad42fe2d40316822be1))
  - enable flow types on component-registry and fix missing types ([62b0b5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/62b0b5dcebeadf3b2a2ccabd47fd6bcfb38d485d))
  - styling of create and delete button on inline edit ([9e0edf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9e0edf02d89697f522df22d41d4846167a3d7c68))
  - rephrase error message ([a80556](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a80556893ce3c4dfec58ac1278bfc199c5f76c0e))
  - remove cache when change from authenticated to not auth ([0353b7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0353b71bb511b7012542aa2e1ff21c14d2d5301a))
  - rename addParametersFromHref to addParametersFromString ([e2a7a2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e2a7a268e243eb8fd4bd5dff55fc489056adf394))
  - set min width on action button cell ([d682c4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d682c4a4cfa7e84acd5b202c24dbf5d248d8cacf))
  - render content type icon on source references ([a2a3ed](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a2a3edce68e8b14552ee08f42a58c1abc6036a2f))
  - icon popover should not have initial focus ([5a297f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5a297fa0b78fe8168772f54a2968473e2c5fc154))
  - remove console message ([8b2025](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8b20251015da74a1a81ffd32b9bcf40e89e97324))
  - update labels on model catalog ([d67fc9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d67fc9953d0e7b91d1d47f173cf40bdc5612161e), [0ef45a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0ef45a9361a05e4aa05c925a99e373747fbdd504))
  - fix flow typings ([17ed58](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/17ed580aab6789314d9051269c7c622d9dde18f0))
  - add classname to button ([ffdf60](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ffdf6074c0b04abf8465772acc5ca850b3215662))
  - extra css classes for webdriver tests ([62deeb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/62deebcd55df5868d51fa3560ff99bc64700d119))
  - margin on modelcatalog ([3b9563](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3b95638e2e6ae556e6e7ef0106a98bf8e86f4518))
  - fix typing on choice filter ([567203](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5672036ed2f21ffe0c9aa709caab1f9d78af67c1))
  - update translations ([58b908](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/58b9080ab18219e1ab4a8df2bf88c53a3b9e6800))
  - updates from backoffice layout ([c72f40](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c72f40b54f0bd901bc9da29a8b67e1f185186250))
  - update model overview for webdriver tests ([64d17b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/64d17b7dd291e5771b985a507c0361fd3dff1ad3))
  - fix typing ([4a0625](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4a062591923c111c460e89488c39713fe5faf4d0))
  - model overview update keys and config path ([a0e3eb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a0e3ebfd849247c4036fbafae6e43b1a093506a0))
  - rendering of form attribute assistant ([eba2b1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eba2b1bdd694888d1605587833bccf1151732136))
  - update width of inline edit tables ([55eef3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/55eef33927123d837f2aebfde545f5cf60320f22))
  - remove overflow-x from inline edit wrapper to fix styling ([064a83](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/064a8334ed0fcd59fa536d0dd0baf209e068824e))
  - add attributes for webdriver tests ([c194fe](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c194fe5b178855b487d1f70935df98f2aa54448b), [502bae](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/502bae03fc65b410d4ee0b070c64fa6b0b67fd12))
  - update inline edit duplicate task ([7fd89c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7fd89cdabf7a9d699f6f517ba8c15becdb45805e))
  - remove comments ([7b4a0e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7b4a0ebe527eb8347c100fa7dd308696a9de0443))
  - remove 'Row' from inline edit translations ([991e41](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/991e4183e7591dd07bb6e2e484c0d2500b103ed1))
  - remove timeout on unmount ([ef2f2f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ef2f2f31abf8049265267a3d1761b97de389f2b6))
  - update rendering of instrument results ([d93c7d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d93c7d8894b3d14d1c0fc192a296a92d67799aa9))
  - fix typings on wrapValue ([3126af](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3126af979692d720149a48730a4a9ecb9d8f8708))
  - minor improvements to inline edit rendering ([65adea](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/65adea026e9b9dbb5124d85411f04dc1468c3b42))
  - remove align-center and align-right layout hints ([573c10](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/573c10d01860c65af8329e32955bb1e82da683fd), [37fb45](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/37fb4568e8b67814704435fdd580b4d43517de43))
  - update focus outline. disable for input fields ([995de2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/995de22281b13f2429d7a0f8d395d6ab4acda85b))
  - accept multiple arguments for getActionsByLayoutHints ([92d2f2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/92d2f2aee9e3db19fa526c61fa879e632d495fa9))
  - update rendering of choice attributes ([6fc136](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6fc13693cf6f73a912e78163f66f9759188d6c16))
  - add isCompleteTaskgroup for different check icon ([95f07f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/95f07f7353a86605261773f7dbc60862b34f7c05))
  - cleanup of layout hints ([f0e951](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f0e951a8da4ea92c2e1e2a75226a89eed2bcfbc6))
  - combine various title hint configuration into one ([aea174](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aea17470140f066de296ae8ca3570f5d3080afc9))
  - rewrite description of hide-label hint ([4308b2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4308b2b9e6af893126511e0219a2f4645f4d68f5))
  - check on empty href ([1f5c5e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1f5c5ec28f6d9186e88c57625f08c4ea656aa328), [3c3021](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3c3021ced718616dacc41d9411d4d6c1e7cfc804))
  - click on selectable list items ([770422](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/770422686dcd945ad5fb794f0dd1d9ddb188427d))
  - fix array attributes with composites on eacht option ([e83f29](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/e83f2921edb8acae9a028cc8f06ee43e52e585dc))
  - set initial focus to first element that is not the close btn ([7dc33c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7dc33ca2cb6de9ad04191016a10a8a188e57b365))
  - a11y improvements ([d067f7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d067f7dd70aba209ebb02c9293876f2c2b4ea772))
  - update typing of event listener ([2eeec1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2eeec108af7554ab8a8335a5ef1cf6863477b3f0), [401559](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4015594d646b3b46f5a611cae2b7ad8b214a0861))
  - update wysiwyg editor ([6a551a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6a551a86981829efec03c13cc6838a8fbc2fbe70))
  - move activate-user and block-user to backoffice layout ([de3331](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/de33313082fb4282c4b622edd29a4fd0342575fe))
  - render time limit end icon ([122950](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/122950171e9f68a9b3d291aeb517d39c7d1584d7))
  - update typings of wysiwyg input ([b62d4e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b62d4e5a0b2cb9cf7883ec19000e5d621501ba40))
  - move loading of dynamic validations to ModularUIRequest ([23d5e6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/23d5e60dc600fcbc0dd23c15029d129f27e9c637), [fb8f8a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fb8f8ac2064bd280adf9770577cc8c732090128e))
  - update rendering of forms with dynamic validations ([d30f07](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d30f079d489e0b49b47eb1e5f1d83ab008072f5a))
  - usage of key property of current Location ([031a81](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/031a815bf46c08bdd082fe6f2a45de99c0d48be8))
  - fix typings on Modal ([73fd17](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/73fd170e43dd0de058d11100d4e91540bcaaa7a2))
  - use focus-trap in stead of focus-trap-react for more control ([341368](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3413688124d306f9289d0471a2958cbcb15b0930))
  - fix progress indicator after change to styled components ([c19d87](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c19d87ff44f6c04abf1039b94f753e736fed8f0c))
  - don't remove outline. for a11y ([5c133d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5c133d1833c136e16655f118d46dff2de46d134b))
  - a11y modifications ([0825ad](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0825adf8be618369236820541959bbfbe6dec640))
  - fix typing of internal state of textfilter ([c57e6a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c57e6a4ca290f0912edbb99d35f14ce9c2b687c2))
  - remove red border on focus datepicker elements ([b7b579](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b7b5790809d7e63be0e57a4ecb0f8bf64ac10664))
  - replace withRouter with redux reducer state and selectors ([44b510](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/44b510d439edcbbfefe2ad57f1f154444e9c25b9))
  - use .map method directly on LinkCollection ([020701](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/020701de7b0295332d073194ef77db21e3f5ab67))
  - replaced react-helmet with react-helmet-async ([89ce13](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/89ce135126fa825bdcd77279f6e7d79d779dd04c), [5f6131](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5f61310c7af49ca1cf4d12834b0db77fb64e47d6))
  - replace AttributeFactory class with createAttribute method ([78adf8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/78adf809d630897a167a3e32d6ec63e4c3c57e36), [219020](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/219020a183bfb3f37e8a24fdf009a38e88a243e5), [29b46d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/29b46d77bff8212339fa578af14649671e58ff66))
  - replace momentjs with date-fns for date / time functions ([352e8f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/352e8fbab3802397751799c03b60115fddeb3e07))
  - update input event handlers ([362edf](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/362edf4e98a4ca06314236b1420894aac9532408))

### Tests

- **other**
  - add extra lodash flowRight rule ([4c4bdc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4c4bdc5e6a2d111f102168bfcc3371b1152cafb1))
  - add extra lint plugins for lodash, sonarjs to beinformed part ([0dd26c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0dd26ca5de098c6c6f2829f56095116f86626df7))
  - add panelcollection tests ([93a315](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/93a3159cedd29603f495ca4dd4db7fb2db7eab51))
  - update used assert methods ([75baf7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/75baf7551d4cd1a59d10f262d5fe8080619c4428), [5823f7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5823f75ef7c026c119898b4b68edbc49ac562536))
  - extra unittests for FormModel ([d3c53b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d3c53b8444f710557378a405d9e912a4dd2db8f5))
  - fix flowtype on test ([3c2cca](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3c2cca586c975995908f84459bc38c667be6ce28), [68e034](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/68e034058699bd2aade9439ba18a670de5748534))
  - add unittest for xhr and others ([910a4a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/910a4a9f12f78288e9c2145227890e2c1b36e8b6))
  - add and update unit tests ([b15a34](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b15a34d1f65eac6858a51910670304bd19d70d1b))
  - fix check on initial links ([ba01d4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ba01d436b39edf9e3e8421282c72d6c9927abe4e))
  - update arguments after change to updateAttribute method ([da3d60](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/da3d604a31761d872f14b7d5999fbe566c2d9b0a))

### Build

- **other**
  - update updateManifest task for semver and package.json ([f5c8a9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f5c8a9f087bbba43a8a4b3d83dc03363be755901))
  - fix storybook build ([76b47c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/76b47ce5629c5fe677636a9dcf37ed434b2ec37d))
  - update babel and eslint configuration ([470f07](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/470f07c24797b19f0723fe454576d6a838ca56a4))
  - fix test ([a5b7fb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a5b7fb159dadacb99e92b9c9547debf5cff265aa))
  - add bundle name to rebuild message ([376818](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/376818f4fab7c370eb2be117359f53cd601b6f3d))
  - prevent problems with paths with spaces in it ([485492](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/48549259364ab817c5aed3d1b5760201646590c9))
  - set eslint default level to warning ([6e3cdc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6e3cdc23a6d915214cd12860efc6ef7a7b066d51))
  - fix creation of jar file on jenkins build ([f80dba](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f80dba7fd575b7bb0c48f97f02facac2e96b5d09))
  - change be informed version number to three digits ([2fb67e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2fb67e9a554ee276965d8856d70019ba27d4e2a0))
  - upgrade react-redux to v6, update connected-router to beta1 ([aea373](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/aea373d0143412ee6711bbb0ba170784f5d6c1cf))
  - upgrade devDependencies css-loader amongst others ([9a50c7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9a50c7da24bcee840f92fb9cbfe23eec50f79b83))
  - upgrade babel to 7.2.x ([1f140d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1f140da8ee54ba467ba94782adce36f253f41d28))
  - temp fix for ajv problem ([84917f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/84917f74c1206e085711d4bcd4241643a75ff6cb))
  - update lint-staged prettier configuration ([38ba7f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/38ba7f6a31bce24870fb6bb3ea1d61695aecac25))

## 3.16.2 (2018-10-19)

### Features

- **other**
  - update hasValue method for composite attributes ([45a05d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/45a05dcc2267e7601918aa55dabdb061f6f79f80))
  - render server errors on readonly attributes ([6914d8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6914d8ba9223c7591b8921753a35a7423b3f3b5d))
  - replace FormErrorTree with FormErrors component ([239374](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2393742c68b481a7e9274e4a5181d41c7949741c))
  - add getLinksByLayoutHint and hasLinksByLayoutHint methods ([be132a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/be132abeaf72d62f55cd2a884d91cbe74939d9aa))
  - updated rendering of readonly composite attributes ([fec299](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fec299791067d960aa3379356d92b4947dc1dc9a))
  - add readonly placeholder to lookup ([490599](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/490599f4e1846f69eeeea028a7ac1e54190f55d8))
  - update icon styles ([311e2a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/311e2afd9e31a98444b2efcc13ba216b7fbcadd0))
  - Added data-id to the lookup list ([fb2999](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/fb299920dffb1370de33c687bfa8ee7acf90a86b))
  - move choice-like inputs to a seperate folder ([9d1261](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9d1261e55d07beee2b6fc6c587d426c48f09a6dd))
  - update rendering of lookup ([4210c5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4210c5c7e04cc76b5478aca47455043884f8bf02), [ef8407](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/ef84074641f0fce38238c6354d9c98a00b9c90d8))
  - add currentColor to svg icon ([a040aa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a040aa7cac64381fb4134ad41064b2acaece82dc))
  - update flow to 0.82 ([861d7a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/861d7a7628c6964f0e921e426991ee9fcb94892d))
  - move babel-polyfill to server bundle ([99243b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/99243bc332f08b4146a10de59e68a10bcb270030))
  - window variable no longer defined on the server ([a0a87c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a0a87c36b21f3771ad154ce2cb5794d9166f2ed8))
  - separate LookupupInputView from LookupInput container ([923565](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/923565c498c03e494887364a09aa3c8c94ac1356))
  - render title on selected options ([20730e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/20730eb8714ba50989029379f5639e4dc2b244dc))
  - render attribute collections on lookup ([4663ea](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4663ea2ded7c9793e5e06cf52bd7a32bb17135e7))
  - attribute collections on lookup and choice attributes ([316591](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/316591475250320927ae7fd1475589e3da0749a7))
  - sourcemaps on css ([bffcb9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/bffcb9d489e9470a0c1ba7b5b93e73c47f2c55d3), [3705e0](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3705e0c8b2f777f5a64bf13a7d436def3f99a93f))
  - fix deeplink to list detail after moving routes to component-reg ([178215](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/178215e53f3b7613ecd3f7f07370a4987ab240a5))
  - remove bootstrap margin class from buttons ([45c241](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/45c2418eab4936c6918209056916fc3c9ab55192))
  - add qualifying classnames to form buttons ([8f2be4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8f2be4ae8930974929f243c7149fa66fec036882))
  - add emptyValue property to readonly attributes ([8bdb5e](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8bdb5e748eb6cdb65aa98c34c77f3266c264739c))
  - make routes available through the component-registry ([263384](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/26338424ba0c4c4f5546a599a5622aa7d96c5a76))
  - user filter property from lookupOptions link ([4345ce](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4345ced51a17391b36cabeff2dd8d0b71ed3e95b))
  - update handling of changed response of lookupOptions service ([c686df](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c686df631a74c15ce0f58aaba831999ae899afdf))
  - moved context component configuration to \_component-registry ([5766f8](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5766f8548d7544e068de59bf92f4dfaed138bfb1), [000374](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/000374b149523c9d53ddcbaf5dafbd9c8859564b))
  - add size property to ModalForm ([27ad56](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/27ad56d7c6b909b74a94de041e57cad5bd3e07e7))
  - add form components to renderers ([f048d3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f048d35b96cd4e33b5b354fabbed3e436f8e6c52), [0cc614](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0cc614612bf264b6a85aabf0993937f1e640f56c))
  - upgrade to babel 7 ([13a889](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/13a8898da163415a27c5a14a1bc287623c975fc5))
  - render range and assignmentfilter in chosen filter ([7f36b1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7f36b18c84c238a052a47a6451c8a968ded9ec53))
  - update casing of username and fullname of userdata service ([54ed7f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/54ed7f73a1a6e497e3f4e5588ccd930e1c001103))
  - add helper methods for values on layout hints ([db5ec3](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/db5ec3ff139794868c6c390bf99834bea447c8b5))
  - render icon from layouthint ([86a861](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/86a8618a18381e2cb213399e87d9c7a8ba43f7b0))
  - add new renderers ([284d8a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/284d8af9d4a4033dc405255ff188a18e1231d3f2), [834942](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/834942f8a7af7fc32242d9e6b694d4af02258be3))
  - rename postfix to unit on number-attribute ([187056](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/1870560af9eb16671574db3085d3207d17299fb4))
  - rename postfix to unit ([4d237f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/4d237f5cce8f60ec308583832e53172088352fe2))
- **lookup**
  - lookup quick and advanced search ([37e1ee](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/37e1ee3739dcd22c1bd68de2dd780a743af5a92c))
- **datepicker**
  - make it possible to hide dates not in shown month ([18cb8c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/18cb8c89c8ec25a0d6ac2e4db6228d1fff4f4742))
- **action**
  - add children property to Action component ([0900c9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0900c93e93b503c655d79655f3d8d45dde770097))
- **server**
  - hydrate state to serverNoSSR.js ([58c143](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/58c143104b0eda191b4e16df3e22d4ba1ffd77be))
- **build**
  - rewrite of build script ([8ace4d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8ace4de78ebfecb49e423d320791e73231cebfd3), [7caa5a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/7caa5a57a5f8e746dd31a320247ce608efcb1c02))
  - layouthint config files are merged ([07eddc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/07eddca2d3fb68333605c6f09ac9c3ac39646eb6))
- **flowtype**
  - rename and export react flowtype Props ([8bb1c7](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8bb1c74ddac7fd2c4fefa68db8c1722092248d82))
- **linkmodel**
  - changed icon property of linkmodel to string ([c68a68](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c68a686e5395b152f7244e1ba9ca7d3a8e0869a5))
- **ui**
  - add icon property ([75e3a2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/75e3a2880be2366661bcb68889017410368ca772))
- **modal**
  - keep focus on modals ([251600](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2516002517bac802b3350b38f0bc0a7795283068), [d9c448](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d9c448789cdd64d7d03684a8733931372d65606c))

### Bug fixes

- **other**
  - render mandatory constraint as single error ([516702](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/516702c08fab2c1533c1c4996577ba1d168ff82d))
  - validations on range attributes ([735d47](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/735d47e40e2e629f7e7c7945082b8a74c455cb13), [28a284](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/28a284fab67fa6048e0bda08abdcc3518dbdb656), [165248](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/165248257c57da2738801d5dca5421a64c51f4c8))
  - remove mandatory sign from assignment filter ([af32dc](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/af32dc9b5d47465aa301c482f0a920e7f1a47417), [21fdde](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/21fdde41e659a53c02c455596a16c4b48f7e7690))
  - rendering of tree input ([472d5c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/472d5c861ec6d3ee04815a5da348bbd8a6e2e712))
  - unknown repeating questions i.c.w. attribute set validations ([d9d72b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d9d72b3638aaeaf3cb3ef9161263cdca23eb9305), [db1dcd](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/db1dcd7c8d8a17b30cbc91a1e47d3f0665b08e6c))
  - empty number value formatted to empty value ([d67043](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d67043e7100eac02f04f24152ff7b2442e280291), [3a0e21](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3a0e21414d66162a70d1877faffd04e9b530df22))
  - render placeholder text on upload input ([007789](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/007789695ba2a02233643c2977af2809af5b7d2b))
  - connection to progress ([65b605](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/65b6059b3abe4e9023028818814dd9f36128357b))
  - remove redundant ownProps ([eda46f](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eda46f1d200429f838ab97aef7140db5ba0eaa4e))
  - make username and password mandatory for signin form ([a9b515](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/a9b51578aa601224daf53fad268a97c4798ae3fe))
  - not-authorized response has status code as not found - [BIPD-9781](https://support.beinformed.com/browse/BIPD-9781) ([eabe1b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eabe1b191167296bd37c9b45fa4f3c635e480e01))
  - fix previous / next repeating question interactions ([641e45](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/641e45854fb97724c0fda51fb1860ff684031db0))
  - add babel-polyfill for ie11 ([6c5c5d](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6c5c5d2d4fd80457cdc93dc94326cd23dec60977))
  - add requested href to memory router ([8f6e8c](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8f6e8c43ebe64847346d2f37f8b8054978fb879e))
  - remove unicode flag on RegExp constructor function ([eb44d1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/eb44d17d30acd51cd88f6301816007e90a8306c6))
  - height:auto on wysiwyg form-control ([b2fe96](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b2fe964ff1cbc90927936099817804aeb146d288))
  - add withRouter hoc to quicksearch ([0802e1](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0802e12a66f4bdad7b6b425afc2a3ec586cf09c4))
- **i18n**
  - update translation of paginginfo and example ([74dee6](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/74dee69f759b150d2192667b84d9c45d2319b007))
- **build**
  - set correct asset path for css ([722326](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/722326bb4b7f125b3e1f875e275eaffe35dc54ba))
- **sorting**
  - update dropdownlink when querystring changes ([f77c4a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/f77c4a207063e7aa706e06946a10b48105e0e479))
- **filters**
  - render unit behind number filters ([c810cb](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/c810cb611f9d231a4aaa811ea09b86b1e1a58891))
- **ui**
  - use absolutehref when redirecting to external location - [BISU-6024](https://support.beinformed.com/browse/BISU-6024) ([8585f4](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8585f452d5a97fb8c9b202551f6869f933206771))
  - correct positioning of IconPopover ([6925e5](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6925e599107f900cdece95c969543817715b3da5))
  - set align property on DropdownChildren not Dropdown ([93c718](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/93c718d17a6d470ea5cb44d22b0c17835aa05349))
- **renderers**
  - move renderer configuration ([d34a83](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/d34a83cdd0d2afe88b339b8cbe2f4032b3b8bd6e))
- **choiceinput**
  - update rendering of empty choice attribute ([0c8f6b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0c8f6be1e5928da77605c0ab51f82cda5763a3d6))
- **icon**
  - missing scss import ([acf810](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/acf810162889453a8ac76f9ec638f67a21ef8d75))

### Style

- **other**
  - rename data-name attributes to data-id for consistency ([786b31](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/786b31877f5f23ed4403e0414b9d9adba4f9f8a5))
  - replace react-router-redux with connected-react-router ([5bcc7a](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/5bcc7aa3abeba8e1f95537d5d30cfe4578fa69d4))
- **flow**
  - update array notations ([8a1d00](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/8a1d00da5ffb66dd521bf51818f5fd1ac1a5b3de))
- **storybook**
  - set constant definition of detail id ([246144](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/24614481c248f22e21116f639174bcec6fdbd076))

### Refactor

- **other**
  - backoffice changes ([9e5e65](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/9e5e651ce03c9c50e60ddae1703a0c5272640532))
  - remove ComponentContext from general layout ([61fc76](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/61fc76122a2d8a324c8020513a2449ff628fb90d))
  - update width of login panel ([b21aa2](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b21aa27e8f55737562013644e0377f1e3d1ce333))
  - update caselist mock with filters ([659193](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/6591938618e7dd47d0b0f25fb05daaacfc36d4e5))
  - export breadcrumb connector ([cf5308](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cf5308966821cc5dd40088a7f6a7a313a85f22c6))
- **icon**
  - use icon: as layout hint ([b8cafa](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/b8cafab092c00b9f50cc63b84b4b99bde94b614d))
- **scss**
  - moved shared scss to separate folder ([2309db](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/2309db5a849685503a917b8ae572b6f0f71460eb))
- **popover**
  - use popper module for popovers ([cd5f18](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/cd5f180e7ffc080e73d0921f613ca4f58ee3115f))

### Build

- **other**
  - update rendering of path to font files ([abd7e9](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/abd7e9e415c89a271e158e909491cf7bf75e4846))
  - separate babelrc configuration for server compilation ([3e4d80](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/3e4d806fbe20f6029c6589ebcf8bb8a31c57cd0a))
  - update to babel 7 ([01505b](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/01505b1adc2c62aa4c47a74e9be8584dc888d814))
- **production**
  - remove deprecated safe option ([0f4667](https://git.beinformed.com/public/nl.beinformed.bi.layout.general/commit/0f4667731aaa5398ae5a7de7476c3ea1874912fb))
