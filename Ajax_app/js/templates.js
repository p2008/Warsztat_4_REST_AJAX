<script id="table_books" type="text/x-handlebars-template">

<div class="table">
    <div class="thead">
        <div id="headers" class="tr">
            {{#each headers}}
                <div class="th">
                    <span>{{ this }}</span>
                </div>
            {{/each}}
        </div>
    </div>

    <div class="tbody">
        {{#each data}}
            <div id="{{ this.id }}" class="tr visible">
                <div class="td">{{ this.id }}</div>
                <div class="td">{{ this.author }}</div>
                <div class="td">{{ this.title }}</div>
                <div class="td">{{ this.isbn }}</div>
                <div class="td">{{ this.publisher }}</div>
                <div class="td">{{ this.genre }}</div>
            </div>
            <div id="info" class="hidden"></div>
        {{/each}}
    </div>
</div>
</script>
<script id="book_details" type="text/x-handlebars-template">
        {{#each data}}
            <div class="td">{{ this }}</div>
        {{/each}}
</script>