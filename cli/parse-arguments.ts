import { parseBadgeJsonConfigFile } from './parse-badge-json-config-file';
import { IconConfig } from './icon-config';
import { addBadge } from '..';
import { Badge } from '../types';
import { Command, Option } from 'commander';

var version = require('../package.json').version;

const program = new Command();
program
  .description('command line for app-icon-badge')
  .name('app-icon-badge')
  .version(version);

// default command
program
  .addCommand(
    new Command('add-badge')
      .description(
        "add badge to the icon runs by default you don't need to specify this command "
      )
      .argument('<iconPath>', 'required argument, icon path')
      .addOption(
        new Option('-t, --type <type>', 'required option')
          .choices(['banner', 'ribbon'])
          .makeOptionMandatory()
      )
      .addOption(
        new Option(
          '-x, --text <text>',
          'required option you need to provide text value'
        ).makeOptionMandatory()
      )
      .addOption(
        new Option(
          '-p, --position <position>',
          'badge position banner:top,bottom and  ribbon:left,right'
        ).choices(['top', 'left', 'right', 'bottom'])
      )
      .addOption(
        new Option('-b, --background <background>', 'badge background color')
      )
      .addOption(
        new Option('-c, --color <color>', 'badge color')
          .choices(['white', 'black'])
          .default('white')
      )
      .helpOption(false)
      .action((iconPath, opts) => {
        program.setOptionValue('iconPath', iconPath);
        program.setOptionValue('badge', opts);
      }),
    {
      isDefault: true,
    }
  )
  .showHelpAfterError();

program.addCommand(
  new Command('use-config')
    .description('use json file as a config')
    .argument('<configPath>')
    .action((configPath) => {
      console.log(configPath);
    })
);

export async function parseArgument() {
  if (process.argv.length <= 2) {
    program.help();
    return;
  }
  const opts = program.parse().opts();
  if (opts.iconPath) {
    const badges: Badge = opts.badge;
    const icon = new IconConfig({ icon: opts.iconPath, badges: [badges] });
    addBadge(icon);
  } else if (opts.badges_config) {
    parseBadgeJsonConfigFile(opts.badges_config);
  }
}
