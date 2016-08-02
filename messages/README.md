/-----------------------------------------------------------------------------\
|                                                                             |
|                        Lab 9: Messages README                               |
|                        By: Chase Troxell, 7/25/16                           |
|                                                                             |
\-----------------------------------------------------------------------------/

The entire lab has been correctly implemented. It parses and displays the JSON
data when provided a valid source. It is styled and index.html has not been
changed.

I did not collaborate with anyone on this assignment.

I spent about 2 hours working on this assignment.

Is it possible to request the data from a different origin or from your local
machine from using XMLHttpRequest? Why or why not?
Yes; XMLHttpRequest allows data requests from different origins utilizing
transfer formats like HTTP:// and data://; as such, it is possible to request
information from different origins (like heroku), while it is not possible to
utilize XHP to access local files (file:///). Files which were not accessible
when the HTML file is opened up using file:// were accessible when it was
served using python's HTTP server, due to the use of a transfer protocol.
