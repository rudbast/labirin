const URL         = 'project.json',
      CONTENT     = '{CONTENT}',
      COUNT       = '{COUNT}',
      PROJECT     = '{PROJECT}',
      DESCRIPTION = '{DESCRIPTION}',
      LINK        = '{LINK}';

const PANEL_CONTAINER = '<div class="panel-group" id="page-list" role="tablist" aria-multiselectable="true">\
                            {CONTENT}\
                        </div>';

const PANEL_CONTENT =  '<div class="panel panel-default">\
                            <div class="panel-heading" role="tab" id="head-' + COUNT + '">\
                                <h4 class="panel-title">\
                                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#page-list" href="#project-' + COUNT + '" aria-expanded="false" aria-controls="project-' + COUNT + '">\
                                        ' + PROJECT + '\
                                    </a>\
                                </h4>\
                            </div>\
                            <div id="project-' + COUNT + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="head-' + COUNT + '">\
                                <div class="panel-body">\
                                    ' + DESCRIPTION + '\
                                    <br><a target=_blank href="http://' + LINK + '">Demo</a>\
                                </div>\
                            </div>\
                        </div>';

// Construct HTML and add into provided container
$.getJSON(URL, function (projects) {
    var projectCount   = 0,
        panelContainer = PANEL_CONTAINER,
        panelContent   = '';

    projects.forEach(function (project, index) {
        var newPanelContent = PANEL_CONTENT;

        // TODO: find another solution to replace all strings.
        for (var i = 0; i < 5; ++i)
            newPanelContent = newPanelContent.replace(COUNT, index);

        newPanelContent = newPanelContent.replace(PROJECT, project.name);
        newPanelContent = newPanelContent.replace(DESCRIPTION, project.description);
        newPanelContent = newPanelContent.replace(LINK, project.link);

        panelContent += newPanelContent;
    });

    panelContainer = panelContainer.replace(CONTENT, panelContent);
    $('#projects-list-container').append($.parseHTML(panelContainer));
});
